import { data } from "./data";
import { Theme } from "./types/app";

const themeImage = document.querySelector(".theme_img") as HTMLImageElement;

export function updateTheme(): Theme {
    if (data.theme === "light") {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        themeImage.src = "/moon.svg";
        return data.theme;
    }

    document.body.classList.remove("light");
    document.body.classList.add("dark");
    themeImage.src = "/sun.svg";
    return data.theme;
}

export function switchTheme(): Theme {
    data.theme = data.theme === "light" ? "dark" : "light";
    localStorage.setItem("data", JSON.stringify(data));
    updateTheme();
    return data.theme;
}
