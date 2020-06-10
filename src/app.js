import $ from 'jquery'

window.onload = () => {
  const handleClick = (imp) => {
    let course = imp
    $('.module').click((e) => {
      let moduleNum = e.target.getAttribute('module-number')
      let pureCourse = course.replace(/\D/g, '')
      let dirtyPath = pureCourse + ' ' + moduleNum
      let clearPath = dirtyPath.replace(/\s+/g, '-')
      console.log(`./assets/${clearPath}/story_html5.html`)
      $('.content').attr('src', `./assets/${clearPath}/story_html5.html`)
    })
  }

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

  const addTitle = () => {
    const selected = $('.panel-block.is-active')[0].text
    $('#course-title').text(selected.trim())
  }
  addTitle()

  const toggleTitle = () => {
    $('.panel-block').click((e) => {
      const number = e.target.getAttribute('course-number')
      $('#course-title').text(number)
    })
    $('.module-link').click((e) => {
      const number = e.target.getAttribute('module-number')
      $('#module-title').text(`Module ${number}`)
      $('#course-title').parent().removeClass('is-active')
      $('#module-title').parent().addClass('is-active')
    })
    if ($('.breadcrumb-item').hasClass('is-active')) {
      $('#course-title').click(() => {
        $('#module-title').parent().removeClass('is-active')
        $('#module-title').remove()
        $('#course-title').parent().addClass('is-active')
      })
    }
  }
  toggleTitle()

  const addModuleNumber = () => {
    //select all elements that have module and panel-block class
    const element = $('.module-link')
    //loop over all the results from above
    for (let i = 0; i < element.length; i++) {
      let moduleNumber = $('.module-link')[i]
      //get content of the stored elements
      let text = moduleNumber.text
      //set the attribute of each element
      moduleNumber.setAttribute('module-number', text.trim())
    }
  }
  addModuleNumber()
  const addCourseNumber = () => {
    //select all elements that have module and panel-block class
    const element = $('.panel-block.course')
    //loop over all the results from above
    for (let i = 0; i < element.length; i++) {
      let courseNumber = $('.panel-block.course')[i]
      //get content of the stored elements
      let text = courseNumber.text
      //set the attribute of each element
      courseNumber.setAttribute('course-number', text.trim())
    }
  }
  addCourseNumber()

  //TODO: [CDI-3] implement sorting modules
  const sortModules = () => {}

  //TODO: [CDI-5] reset search/sort
  const resetFilter = () => {}

  const toggleDropdown = () => {
    $('.dropdown-trigger').click((e) => {
      let target = e.target
      $(target).parent().addClass('is-active')
      let pass = target.getAttribute('course-number')
      handleClick(pass)
    })
    //TODO: [CDI-8] add toggle collapse functionality
  }
  toggleDropdown()

  const addIcon = () => {}

  //TODO: [CDI-1] add search functionality for modules
  const handleSearch = () => {}
}
