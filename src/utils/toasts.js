import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Alert = withReactContent(Swal)


export const createToast = () => {
    return Alert.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
}

export const createToastLoading = () => {
    return Alert.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        allowOutsideClick: false,
        iconHtml: `<div class="spinner-grow text-info me-2" role="status">
                 <span class="sr-only">Loading...</span>
            </div>`,
    });
}
