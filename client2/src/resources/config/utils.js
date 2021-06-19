export class Utils {
    showNotification(msg, title) {
        iziToast.show({
            message: msg,
            position: 'topRight'
        });
    }
}