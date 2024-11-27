import styles from "./footer.module.css";

import logoDrivver from "/images/logo2.png";
import iconInstagram from "/icos/insta.png";
import iconLinkedin from "/icos/linkedin.png";
import iconGithub from "/icos/git.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.containeFooterInfos}>
        <img src={logoDrivver} alt="logo da empresa Drivver" />
        <h5>rods_araujo@hotmail.com</h5>
        <p>Site ficticio gerado para fins de code challenge</p>
      </div>
      <div className={styles.containerSocials}>
        <h5>Social</h5>
        <div className={styles.containerIcons}>
          <a
            className={styles.socialsIcos}
            href="https://github.com/Rod-S-Araujo"
            target="_blank"
          >
            <img src={iconGithub} alt="Icone do github" />
          </a>
          <a
            className={styles.socialsIcos}
            href="https://www.linkedin.com/in/rodaraujotech/"
            target="_blank"
          >
            <img src={iconLinkedin} alt="Icone do linkedin" />
          </a>
          <a
            className={styles.socialsIcos}
            href="https://www.instagram.com/digosaraujo/"
            target="_blank"
          >
            <img src={iconInstagram} alt="Icone do instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
