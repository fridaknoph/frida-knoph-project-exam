const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('main_li')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})

