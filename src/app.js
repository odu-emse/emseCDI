import $ from 'jquery'

$(document).ready(() => {
    $('.breadcrumb-item').eq(1).hide()
    //loads the module media in an iframe
    const handleClick = (imp) => {
        let course = imp
        $('.module').click((e) => {
            let moduleNum = e.target.getAttribute('module-number')
            let path = course + '-' + moduleNum
            $('.content').attr(
                'src',
                `http://127.0.0.1:8080/src/assets/${path}/story.html`
            )
        })
    }

    //toggles the highlight of active icon in the sidebar
    const switchActive = () => {
        $('.panel-block').click((e) => {
            //get element to remove class from
            const existing = $('.panel-block.is-active')[0]
            $(existing).removeClass('is-active')
            const tag = e.target
            //add class to the clicked panel
            $(tag).addClass('is-active')
        })
    }
    switchActive()

    //adds the first part of the breadcrumb (course name/number)
    const addTitle = () => {
        $('.breadcrumb-item').eq(1).show()
        const selected = $('.panel-block.is-active')[0].text
        $('#course-title').text(selected.trim())
    }

    //toggles the breadcrumb title and module based on selected course and module
    const toggleTitle = () => {
        //handles course title
        $('.panel-block').click((e) => {
            const course = e.target.getAttribute('course-number')
            $('#course-title').text(course)
        })
        //handles module title
        $('.module-link').click((e) => {
            const module = e.target.text
            $('#module-title').text(`Module ${module}`)
            $('#course-title').parent().removeClass('is-active')
            $('#module-title').parent().addClass('is-active')
        })
        //TODO: [AODP-14] breadcrumb link to clear module src
        if ($('.breadcrumb-item').hasClass('is-active')) {
            $('#course-title').click(() => {
                $('#module-title').parent().removeClass('is-active')
                $('#module-title').remove()
                $('#course-title').parent().addClass('is-active')
            })
        }
    }
    toggleTitle()

    //adds unique module-number attribute to target element in sidebar
    const addModuleNumber = () => {
        //select all elements that have module and panel-block class
        const element = $('.module-link')
        //loop over all the results from above
        for (let i = 0; i < element.length; i++) {
            let moduleNumber = $('.module-link')[i]
            //get content of the stored elements
            let text = moduleNumber.text
            //set the attribute of each element
            moduleNumber.setAttribute(
                'module-number',
                text.trim().replace(/\D/g, '')
            )
        }
    }
    addModuleNumber()

    //adds unique course-number attribute to target element in sidebar
    const addCourseNumber = () => {
        //select all elements that have module and panel-block class
        const element = $('.panel-block.course')
        //loop over all the results from above
        for (let i = 0; i < element.length; i++) {
            let courseNumber = $('.panel-block.course')[i]
            //get content of the stored elements
            let text = courseNumber.text
            //set the attribute of each element
            courseNumber.setAttribute(
                'course-number',
                text.trim().replace(/\D/g, '')
            )
        }
    }
    addCourseNumber()

    //TODO: [CDI-3] implement sorting modules
    const sortModules = () => {}

    //TODO: [CDI-5] reset search/sort
    const resetFilter = () => {}

    //removes course and module text from breadcrumb
    const removeBreadcrumb = () => {
        if ($('.content').hasAttribute('src')) {
            return null
        } else {
            $('#course-title').text('')
            $('#module-title').text('')
        }
    }

    //handles the dropdown from a course into containing modules
    $('.dropdown-trigger').click((event) => {
        addTitle()
        toggleDropdown(event.target)
    })

    //TODO: [AODP-13] show alt text if iframe returns 404
    const moduleUnavailable = () => {
        if (!$('.content').attr('src', '')) {
            console.log('module content not available.')
        } else {
            return null
        }
    }
    moduleUnavailable()

    const toggleDropdown = (e) => {
        if ($(e).parent().hasClass('is-active')) {
            $(e).parent().removeClass('is-active')
            $(e).removeClass('is-active')
            removeBreadcrumb()
        } else {
            $(e).parent().addClass('is-active')
            let pass = e.getAttribute('course-number')
            handleClick(pass)
        }
    }

    const handleSearch = () => {
        $('#search').on('keyup', function () {
            const value = $(this).val().toLowerCase()
            $('.dropdown').addClass('is-active')
            $('.module-link').filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            })
        })
    }
    handleSearch()
})
