import GetLocation from 'react-native-get-location';

export const getDistance = (lat1, lon1, lat2, lon2, unit) => {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') {
      dist = dist * 1.609344;
    }
    if (unit === 'N') {
      dist = dist * 0.8684;
    }
    return dist;
};

export const position = async () => {
    return await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
}

export const resort = (data) => {
    return data.sort((a, b) => (a.distance > b.distance ? 1 : -1));
}


export const today = () => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]

    var date = new Date().getDate();
    var day = new Date().getDay();
    var month = new Date().getMonth();
    var year = new Date().getFullYear();
    const monthName = months[month]
    const dayName = days[day]
    return dayName + ', ' + date + ' ' + monthName + ' ' + year;//format: dd-mm-yyyy;
}
