export function getRedirectPath({type, avatar}) {
    let url = (type==="mentor")?'/mentor':'/mentee'
    if (!avatar) {
        url += 'info'
    }
    return url
}