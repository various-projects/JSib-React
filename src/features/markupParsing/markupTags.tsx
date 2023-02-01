type TagRule = {
    regex: RegExp,
    replacement: string,
}


export const basicTags: Record<string, TagRule> = {
    b: {   // **bold**)
        regex: /\*\*(.*?)\*\*/,
        replacement: "<b>$1</b>",
    },
    i: {   // *italic*
        regex: /\*(.*?)\*/,
        replacement: "<i>$1</i>",
    },
    u: {   // __underline__
        regex: /__(.*?)__/,
        replacement: "<u>$1</u>",
    },
    s: {   // [s]strike-through[/s]
        regex: /\[s\](.*?)\[\/s\]/,
        replacement: "<s>$1</s>",
    },
    q: {   // >quote
        regex: /(^|<br>)(>[^>].*?)($|<br>)/,
        replacement: "$1<q class='quote'>$2</q>$3",
    }
}