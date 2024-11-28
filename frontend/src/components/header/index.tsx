import { useEffect, useState } from "react";
import styles from "./header.module.css";
import logoDrivver from "/images/logo2.png";
import IUser from "../../interfaces/IUser";

const Header = () => {
  const [customer, setCustomer] = useState<IUser | null>(null);

  const updateCustomerFromLocalStorage = () => {
    const storedCustomer = localStorage.getItem("authToken");
    if (storedCustomer) {
      try {
        const parsedCustomer = JSON.parse(storedCustomer);
        setCustomer(parsedCustomer);
      } catch (error) {
        console.error("Erro ao recuperar JSON do localStorage:", error);
      }
    } else {
      setCustomer(null);
    }
  };

  useEffect(() => {
    updateCustomerFromLocalStorage();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "authToken") {
        updateCustomerFromLocalStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <header className={styles.header}>
      <img
        className={styles.logoDrivver}
        src={logoDrivver}
        alt="Logo da aplicação Drivver"
      />
      {customer ? <h2>Olá {customer.name}</h2> : ""}
    </header>
  );
};

export default Header;
