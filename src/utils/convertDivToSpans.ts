
export const convertDivToSpans = (elements?: NodeListOf<HTMLElement>) => {
    if (!elements) return
    elements?.forEach(element => {
        if (!element) return
        element.style.overflow = 'hidden';
        element.innerHTML = element.innerText.split("").map((char) => {

            if (char === " ") {
                return `<span>${char}</span>`;
            }
            return `<span class="animatedis">${char}</span>`
        }).join("");

        return element;
    })
    return elements
}