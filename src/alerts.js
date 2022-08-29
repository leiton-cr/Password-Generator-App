
const options = {
    toast: true,
    position: 'top-right',
    iconColor: 'rgb(24, 23, 31)',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
}

const showSuccess = () => {
    Swal.mixin(options).fire({
        icon: 'success',
        title: 'Successfully copied'
    })
}

const showError = () => {
    Swal.mixin(options).fire({
        icon: 'error',
        title: 'Could not copy'
    })
}

export {showError,showSuccess}