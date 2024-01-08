import React, { useState } from 'react'
import styles from "./sidenav.module.css"
// import Image from "next/image"
import { FaTelegram } from "react-icons/fa"
import logo from "../assets/logo.webp"
import { GiOpenBook } from "react-icons/gi"

import { FaSquareTwitter } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"
const SideNav = (props) => {
    const [value, setValue] = useState(0)
    const [navstatus, setNavstatus] = useState(false)
    const NavOpenClosefn = () => {
        const element = document.getElementById("nav")
        const width = "80%";
        if (element.style.width === width) {
            element.style.width = "0%"
            setNavstatus(false)
        } else {
            element.style.width = width;
            setNavstatus(true)
        }
    }
    return (
        <div className={styles.nav} id="nav">
            <div className={styles.topnav}>
                <IoMdClose className={styles.exiticon}
                    onClick={NavOpenClosefn}
                />
            </div>
            {/* <Image src={logo} alt='PYRAMID PONZU' /> */}
            <img src={logo} alt="logo" border="0" className={styles.logo} />
            <h1 className={styles.title}>PYRAMID PONZU</h1>
            <div className={styles.bar}></div>
            {/* <div className={styles.data_cont}>
                <h3>SAND</h3>
                <h4>{value}%</h4>
            </div> */}
            <div className={styles.data_cont}>
                <h3>Daily Return</h3>
                <h4>{13}%</h4>
            </div>
            <div className={styles.data_cont}>
                <h3>APR</h3>
                <h4>{4745}%</h4>
            </div>
            <div className={styles.data_cont}>
                <h3>Dev Fee</h3>
                <h4>{4}%</h4>
            </div>
            <div className={styles.socials_cont}>
                <div className={styles.socials_inner}>
                    <FaSquareTwitter size={30} className={styles.icon} />
                    <GiOpenBook size={30} className={styles.icon} />
                    <FaTelegram size={30} className={styles.icon} />
                </div>
            </div>
        </div>
    )
}

export default SideNav