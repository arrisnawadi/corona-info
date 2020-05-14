function jscript() {
    const topArrow = document.querySelector('.scroll-top')
    const header = document.querySelector('.jumbotron')

    window.addEventListener('scroll', function () {
        window.pageYOffset > header.offsetHeight ? topArrow.style.visibility = "visible" : topArrow.style.visibility = "hidden"
    })

    topArrow.addEventListener("click", () => {
        scrollTo(0, 0)
    })
}

export default jscript

