import { useState } from "react";
import styles from "./SideBar.module.css";

type Props = {
    applyStyle: (styleName: string) => void,
}

export const SideBar = (props: Props) => {
    const [currentStyle, setStyle] = useState("");

    return (
        <div style={{ position: "fixed" }}>
            <ul className={styles.ulMenu}>
                <svg width="24px" height="24px" viewBox="4 4 18 18">
                    {/* source: https://upload.wikimedia.org/wikipedia/commons/7/77/Gear_icon.svg */}
                    <path
                        d="M20,14.5v-2.9l-1.8-0.3c-0.1-0.4-0.3-0.8-0.6-1.4l1.1-1.5l-2.1-2.1l-1.5,1.1c-0.5-0.3-1-0.5-1.4-0.6L13.5,5h-2.9l-0.3,1.8  C9.8,6.9,9.4,7.1,8.9,7.4L7.4,6.3L5.3,8.4l1,1.5c-0.3,0.5-0.4,0.9-0.6,1.4L4,11.5v2.9l1.8,0.3c0.1,0.5,0.3,0.9,0.6,1.4l-1,1.5  l2.1,2.1l1.5-1c0.4,0.2,0.9,0.4,1.4,0.6l0.3,1.8h3l0.3-1.8c0.5-0.1,0.9-0.3,1.4-0.6l1.5,1.1l2.1-2.1l-1.1-1.5c0.3-0.5,0.5-1,0.6-1.4  L20,14.5z M12,16c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S13.7,16,12,16z" />
                </svg>
                <li onClick={() => props.applyStyle('basic.css')}>
                    Basic skin
                </li>
                <li onClick={() => props.applyStyle('dark.css')}>
                    Dark skin
                </li>
                <li>
                    Custom CSS:
                    <ul className="ulMenu">
                        <li>
                            <input value={currentStyle} name="customCssUrl" placeholder="Enter CSS URL" onChange={(event) => { setStyle(event.target.value) }} />
                            <button onClick={() => props.applyStyle(currentStyle)}>Apply</button>
                        </li>
                    </ul>
                </li>
                <li>

                </li>
            </ul>
        </div>
    );
}