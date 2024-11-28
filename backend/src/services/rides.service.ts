import { DATE, json, ModelStatic, Op } from "sequelize";
import RidesModel from "../models/RidesModel";
import DriverModel from "../models/DriverModel";

const resp = require("../utils/resp");

const apiKey = "AIzaSyD3vT6Sef7WGzsWTY_STmtVEtHyUDfEOxE";
import IRides from "../interfaces/IRides";
import axios from "axios";

RidesModel.associate({ DriverModel });
DriverModel.associate({ RidesModel });

class RidesServices {
  private model: ModelStatic<RidesModel> = RidesModel;
  private driverModel: ModelStatic<DriverModel> = DriverModel;

  async estimate(body: { origin: string; destination: string }) {
    const originGeocode = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      { params: { address: body.origin, key: apiKey } }
    );
    const destinationGeocode = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      { params: { address: body.destination, key: apiKey } }
    );

    const originCoord = originGeocode.data.results[0].geometry?.location;
    const destinationCoord =
      destinationGeocode.data.results[0].geometry?.location;

    const route = await axios.get(
      "https://maps.googleapis.com/maps/api/directions/json",
      {
        params: {
          origin: `${originCoord.lat},${originCoord.lng}`,
          destination: `${destinationCoord.lat},${destinationCoord.lng}`,
          key: apiKey,
        },
      }
    );
    const routeData = route.data;
    const distance = route.data.routes[0].legs[0].distance.value;
    const duration = route.data.routes[0].legs[0].duration.text;

    const drivers = await this.driverModel.findAll({
      where: {
        min_distance: {
          [Op.lte]: distance / 1000,
        },
      },
    });

    const options = await drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: {
        rating: driver.rating,
        comment: driver.comment,
      },
      duration,
      distance,
      value: (distance / 1000) * driver.rate_per_km,
    }));

    return resp(200, {
      origin: {
        latitude: originCoord.lat,
        longitude: originCoord.lng,
      },
      destination: {
        latitude: destinationCoord.lat,
        longitude: destinationCoord.lng,
      },
      distance,
      duration,
      options,
      routeData,
    });
  }

  async confirm(body: {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: { id: number; name: string };
    value: number;
  }) {
    const ride: IRides = {
      origin: body.origin,
      destination: body.destination,
      distance: body.distance,
      duration: body.duration,
      date: new Date(),
      value: body.value,
      customer_id: body.customer_id,
      driver_id: body.driver.id,
    };

    const createRide = await this.model.create(ride);

    return resp(200, createRide);
  }

  async getByCustomer(customer_id: string, driver_id: number) {
    const whereConditions: any = { customer_id };

    if (driver_id != 0) {
      whereConditions.driver_id = driver_id;
    }
    const rides = await this.model.findAll({
      where: whereConditions,
      include: [
        {
          model: DriverModel,
          as: "driver",
        },
      ],
      raw: false,
      nest: true,
    });

    const ridesFiltred = await Promise.all(
      rides.map(async (ride) => {
        const driver = await this.driverModel.findOne({
          where: {
            id: ride.driver_id,
          },
        });
        if (!driver) {
          return resp(404, "Usuario não encontrado");
        }
        console.log(ride);

        return {
          id: ride.id,
          date: ride.date,
          origin: ride.origin,
          destination: ride.destination,
          distance: ride.distance,
          duration: ride.duration,
          driver: {
            id: ride.driver_id,
            name: driver.name,
          },
          value: ride.value,
        };
      })
    );
    return resp(200, {
      customer_id,
      rides: ridesFiltred,
    });
  }
}

module.exports = RidesServices;
