/* global window */

"use strict";

window.acssLiveConfig = {
    colors: {
            // Advisor Kodi
            // akAccBg: "#ffff99", // Accent background
            akBtnBg: "#01743d", // Button background
            akBtnTx: "#ffffff", // Button text
            akBtnTx2: "#ffffff",
            akHdBg: "#01743d", // Heading background
            akHd2Bg: "#f0c810", // Heading 2, like heading 1 but more muted
            akHdTx: "#ffffff",
            akHd2Tx: "#ffffff",
            akHd3Tx: "#01743d", // Heading 3 text in accent
            akPgBg: "#ffffff", // The background within the content area
            akPgMBg: "#000000", // The background of the margin around the content area
            // akTabBg: "#cc9900", // Tab background
            akThmBd: "#01743d", // Theme-colored border
            akThmTx: "#01743d", // Theme-color text

            // Cubmaster Bob Katt
            // cbkAccBg: "#ffff99", // Accent background
            cbkBtnBg: "#016ca2", // Button background
            cbkBtnTx: "#ffffff", // Button text
            cbkBtnTx2: "#ffffff",
            cbkHdBg: "#016ca2", // Heading background
            cbkHd2Bg: "#29a1c6", // Heading 2, like heading 1 but more muted
            cbkHdTx: "#ffffff",
            cbkHd2Tx: "#ffffff",
            cbkHd3Tx: "#016ca2", // Heading 3 text in accent
            cbkPgBg: "#ffffff", // The background within the content area
            cbkPgMBg: "#000000", // The background of the margin around the content area
            // cbkTabBg: "#cc9900", // Tab background
            cbkThmBd: "#016ca2", // Theme-colored border
            cbkThmTx: "#016ca2", // Theme-color text

            // Nova Lab
            // novaAccBg: "#ffff99", // Accent background
            novaBtnBg: "#0060b7", // Button background
            novaBtnTx: "#fd9600", // Button text
            novaBtnTx2: "#bbbbbb",
            novaHdBg: "#0060b7", // Heading background
            novaHd2Bg: "#50d7f7", // Heading 2, like heading 1 but more muted
            novaHdTx: "#fd9600",
            novaHd2Tx: "#ffffff",
            novaHd3Tx: "#0060b7", // Heading 3 text in accent
            novaPgBg: "#ffffff", // The background within the content area
            novaPgMBg: "#000000", // The background of the margin around the content area
            // novaTabBg: "#cc9900", // Tab background
            novaThmBd: "#0060b7", // Theme-colored border
            novaThmTx: "#0060b7", // Theme-color text

            // Scoutmaster Bucky
            smbAccBg: "#ffff99", // Accent background
            smbBtnBg: "#5b8800", // Button background
            smbBtnTx: "#ffffff", // Button text
            smbBtnTx2: "#000000",
            smbHdBg: "#5b8800", // Heading background
            smbHd2Bg: "#a4c57c", // Heading 2, like heading 1 but more muted
            smbHdTx: "#ffffff",
            smbHd2Tx: "#ffffff",
            smbHd3Tx: "#336600", // Heading 3 text in accent
            smbPgBg: "#ffffff", // The background within the content area
            smbPgMBg: "#000000", // The background of the margin around the content area
            smbTabBg: "#cc9900", // Tab background
            smbThmBd: "#5b8800", // Theme-colored border
            smbThmTx: "#5b8800", // Theme-color text

            // S.S. Seagal
            // sssAccBg: "#ffff99", // Accent background
            sssBtnBg: "#062a5e", // Button background
            sssBtnTx: "#ffffff", // Button text
            sssBtnTx2: "#bbbbbb",
            sssHdBg: "#ffffff", // Heading background
            sssHd2Bg: "#ffffff", // Heading 2, like heading 1 but more muted
            sssHdTx: "#062a5e",
            sssHd2Tx: "#ffffff",
            sssHd3Tx: "#062a5e", // Heading 3 text in accent
            sssPgBg: "#ffffff", // The background within the content area
            sssPgMBg: "#006599", // The background of the margin around the content area
            // sssTabBg: "#cc9900", // Tab background
            sssThmBd: "#062a5e", // Theme-colored border
            sssThmTx: "#062a5e" // Theme-color text
    },
    values: {
            ruledBg: "linear-gradient(to bottom, transparent 21px, #bbb 21px, #bbb 22px, transparent 22px)",
            ruledBgSize: "100% 26px",
            gridBg: "linear-gradient(to right, transparent 35px, #bbb 35px, #bbb 36px, transparent 36px), linear-gradient(to bottom, transparent 35px, #bbb 35px, #bbb 36px, transparent 36px)",
            gridBgSize: "38px 38px",
            requirementIndent: "32px",
            requirementGap: "12px",
            smbReqP: "1em", // Same as requirementGap, but should deprecate and remove
            wbBdw: "1px",
            wbLh: "1.2em",
            wbMt: "-1px",
            wbP: "0.25em",
            workbookLineHeight: "26px",
            whiteGlow:
                "-2px 0 2px white, 0 -2px 2px white, 2px 0 2px white, 0 2px 2px white"
    },
    classes: {
        Ba: ["break-after", {
                    a: "auto",
                    av: "avoid",
                    alw: "always",
                    all: "all",
                    ap: "avoid-page",
                    p: "page",
                    start: "left",
                    end: "right",
                    ro: "recto",
                    vo: "verso",
                    ac: "avoid-column",
                    c: "column",
                    ar: "avoid-region",
                    r: "region"
        }],
        Bb: ["break-before", {
                    a: "auto",
                    av: "avoid",
                    alw: "always",
                    all: "all",
                    ap: "avoid-page",
                    p: "page",
                    start: "left",
                    end: "right",
                    ro: "recto",
                    vo: "verso",
                    ac: "avoid-column",
                    c: "column",
                    ar: "avoid-region",
                    r: "region"
        }],
        Bi: ["break-inside", {
                    a: "auto",
                    av: "avoid",
                    ap: "avoid-page",
                    ac: "avoid-column",
                    ar: "avoid-region"
        }],
        Cc: ["column-count"],
        Cf: ["column-fill"],
        Cg: ["column-gap"],
        Crc: ["column-rule-color", 'colors'],
        Crs: ["column-rule-style", 'borderStyle'],
        Crw: ["column-rule-width"],
        Cs: ["column-span", {
            a: "all",
            n: "none"
        }],
        Cw: ["column-width"],
        Pba: ["page-break-after", {
                    a: "auto",
                    av: "avoid",
                    al: "always",
                    left: "left",
                    right: "right"
        }],
        Pbb: ["page-break-before", {
                    a: "auto",
                    av: "avoid",
                    al: "always",
                    left: "left",
                    right: "right"
        }],
        Pbi: ["page-break-inside", {
                    a: "auto",
                    av: "avoid"
        }]
    }
};

require("@fidian/acss-live/acss-live.min");
