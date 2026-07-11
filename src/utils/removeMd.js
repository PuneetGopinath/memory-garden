/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import removeMarkdown from "remove-markdown";

export default function removeMd(text) {
    if (!/[#*_`~[\]()!-]/.test(text)) return text;

    return removeMarkdown(text, {
        stripListLeaders: true,
        gfm: true,
        useImgAtlText: true,
        preserveNewLines: true,
    });
};
