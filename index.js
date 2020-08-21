class DateObject {
    #year
    #month
    #day
    #hour
    #minute
    #second
    #millisecond
    #format
    #local = DateObject.locals.EN
    #calendar = DateObject.calendars.GEORGIAN
    #leaps = []
    #types = {
        YYYY: /\d{4}/,
        YY: /\d\d/,
        MMMM: /[A-z]{3,9}/,
        MMM: /[A-z]{3,9}/,
        MM: /\d\d/,
        M: /\d{1}/,
        DDDD: /\d{1,3}/,
        DDD: /\d{1,3}/,
        DD: /\d\d/,
        D: /\d/,
        dddd: /[A-z]{3,9}/,
        ddd: /[A-z]{3,9}/,
        HH: /\d\d/,
        H: /\d/,
        hh: /\d\d/,
        h: /\d/,
        mm: /\d\d/,
        m: /\d/,
        ss: /\d\d/,
        s: /\d/,
        SSS: /\d{3}/,
        SS: /\d\d/,
        S: /\d/,
        a: /[a-z]{3,9}/,
        A: /[a-z]{3,9}/
    }

    #reverse = {
        "YYYY": string => this.#year = Number(string),
        "YY": string => this.#year = Number(string),
        "MMMM": string => this.#month = this.months.findIndex(month => string.toLowerCase() === month.name.toLowerCase()),
        "MMM": string => this.#month = this.months.findIndex(month => string.toLowerCase() === month.shortName.toLowerCase()),
        "MM": string => this.#month = Number(string) - 1,
        "M": string => this.#month = Number(string) - 1,
        "DD": string => this.#day = Number(string),
        "D": string => this.#day = Number(string),
        "HH": string => this.#hour = Number(string),
        "H": string => this.#hour = Number(string),
        "hh": string => {
            let hour = Number(string)

            this.#hour = hour > 12 ? hour - 12 : hour
        },
        "h": string => {
            let hour = Number(string)

            this.#hour = hour > 12 ? hour - 12 : hour
        },
        "mm": string => this.#minute = Number(string),
        "m": string => this.#minute = Number(string),
        "ss": string => this.#second = Number(string),
        "s": string => this.#second = Number(string),
        "SSS": string => this.millisecond = Number(string),
        "SS": string => this.millisecond = Number(string),
        "S": string => this.millisecond = Number(string),
    }

    static calendars = {
        GEORGIAN: "GEORGIAN",
        PERSIAN: "PERSIAN"
    }

    static locals = {
        EN: "EN",
        FA: "FA"
    }

    #months = {
        [DateObject.calendars.GEORGIAN]: {
            [DateObject.locals.EN]: [
                { name: "January", shortName: "Jan", length: 31 },
                { name: "February", shortName: "Feb", length: undefined },
                { name: "March", shortName: "Mar", length: 31 },
                { name: "April", shortName: "Apr", length: 30 },
                { name: "May", shortName: "May", length: 31 },
                { name: "June", shortName: "June", length: 30 },
                { name: "July", shortName: "July", length: 31 },
                { name: "August", shortName: "Aug", length: 31 },
                { name: "September", shortName: "Sept", length: 30 },
                { name: "October", shortName: "Oct", length: 31 },
                { name: "November", shortName: "Nov", length: 30 },
                { name: "December", shortName: "Dec", length: 31 }
            ],
            [DateObject.locals.FA]: [
                { name: "ژانویه", shortName: "Jan", length: 31 },
                { name: "فوریه", shortName: "Feb", length: undefined },
                { name: "مارس", shortName: "Mar", length: 31 },
                { name: "آوریل", shortName: "Apr", length: 30 },
                { name: "مه", shortName: "May", length: 31 },
                { name: "ژوئن", shortName: "June", length: 30 },
                { name: "ژوئیه", shortName: "July", length: 31 },
                { name: "اوت", shortName: "Aug", length: 31 },
                { name: "سپتامبر", shortName: "Sept", length: 30 },
                { name: "اکتبر", shortName: "Oct", length: 31 },
                { name: "نوامبر", shortName: "Nov", length: 30 },
                { name: "دسامبر", shortName: "Dec", length: 31 }
            ]
        },
        [DateObject.calendars.PERSIAN]: {
            [DateObject.locals.EN]: [
                { name: "Farvardin", shortName: "Far", length: 31 },
                { name: "Ordibehesht", shortName: "Ord", length: 31 },
                { name: "Khordad", shortName: "Khor", length: 31 },
                { name: "Tir", shortName: "Tir", length: 31 },
                { name: "Mordad", shortName: "Mor", length: 31 },
                { name: "Shahrivar", shortName: "Sha", length: 31 },
                { name: "Mehr", shortName: "Mehr", length: 30 },
                { name: "Aban", shortName: "Aban", length: 30 },
                { name: "Azar", shortName: "Azar", length: 30 },
                { name: "Dey", shortName: "Dey", length: 30 },
                { name: "Bahman", shortName: "Bah", length: 30 },
                { name: "Esfand", shortName: "Esf", length: undefined }
            ],
            [DateObject.locals.FA]: [
                { name: "فروردین", shortName: "فر", length: 31 },
                { name: "اردیبهشت", shortName: "ارد", length: 31 },
                { name: "خرداد", shortName: "خرد", length: 31 },
                { name: "تیر", shortName: "تیر", length: 31 },
                { name: "مرداد", shortName: "مر", length: 31 },
                { name: "شهریور", shortName: "شه", length: 31 },
                { name: "مهر", shortName: "مهر", length: 30 },
                { name: "آبان", shortName: "آبا", length: 30 },
                { name: "آذر", shortName: "آذر", length: 30 },
                { name: "دی", shortName: "دی", length: 30 },
                { name: "بهمن", shortName: "بهم", length: 30 },
                { name: "اسفند", shortName: "اسف", length: undefined }
            ]
        }
    }

    #weeks = {
        [DateObject.calendars.GEORGIAN]: {
            [DateObject.locals.EN]: [
                { name: "Sunday", shortName: "Sun", index: 0 },
                { name: "Monday", shortName: "Mon", index: 1 },
                { name: "Tuesday", shortName: "Tue", index: 2 },
                { name: "Wednesday", shortName: "Wed", index: 3 },
                { name: "Thursday", shortName: "Thu", index: 4 },
                { name: "Friday", shortName: "Fri", index: 5 },
                { name: "Saturday", shortName: "Sat", index: 6 }
            ],
            [DateObject.locals.FA]: [
                { name: "یکشنبه", shortName: "یک", index: 0 },
                { name: "دوشنبه", shortName: "دو", index: 1 },
                { name: "سه شنبه", shortName: "سه", index: 2 },
                { name: "چهارشنبه", shortName: "چهار", index: 3 },
                { name: "پنجشنبه", shortName: "پنج", index: 4 },
                { name: "جمعه", shortName: "جم", index: 5 },
                { name: "شنبه", shortName: "شن", index: 6 },
            ]
        },
        [DateObject.calendars.PERSIAN]: {
            [DateObject.locals.EN]: [
                { name: "Panjshanbeh", shortName: "Panj", index: 5 },
                { name: "Jomeh", shortName: "Jom", index: 6 },
                { name: "Shanbeh", shortName: "Shan", index: 0 },
                { name: "YekShanbeh", shortName: "Yek", index: 1 },
                { name: "Doshanbeh", shortName: "do", index: 2 },
                { name: "Seshanbeh", shortName: "Se", index: 3 },
                { name: "Chaharshanbeh", shortName: "Char", index: 4 },
            ],
            [DateObject.locals.FA]: [
                { name: "پنجشنبه", shortName: "پنج", index: 5 },
                { name: "جمعه", shortName: "جم", index: 6 },
                { name: "شنبه", shortName: "شن", index: 0 },
                { name: "یکشنبه", shortName: "یک", index: 1 },
                { name: "دوشنبه", shortName: "دو", index: 2 },
                { name: "سه شنبه", shortName: "سه", index: 3 },
                { name: "چهارشنبه", shortName: "چهار", index: 4 },
            ]
        }
    }

    #digits = {
        [DateObject.locals.EN]: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        [DateObject.locals.FA]: ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]
    }

    #meridiems = {
        [DateObject.locals.EN]: [{ lowerCase: "am", upperCase: "AM" }, { lowerCase: "pm", upperCase: "PM" }],
        [DateObject.locals.FA]: [{ lowerCase: "ق.ظ", upperCase: "قبل از ظهر" }, { lowerCase: "ب.ظ", upperCase: "بعد از ظهر" }]
    }

    constructor(object = { date: new Date() }) {
        if (object instanceof Date || object instanceof DateObject || typeof object === "string") object = { date: object }

        let { calendar, local, format, date, year, month, day, hour, minute, second, millisecond } = object
        let mustGetLeaps = true

        if (calendar) this.#calendar = DateObject.calendars[calendar.toUpperCase()]
        if (!this.#calendar) throw new Error("calendar not found")
        if (local) this.#local = DateObject.locals[local.toUpperCase()] || DateObject.locals.EN
        if (calendar && !date && !year && !month && !day && !hour && !minute && !second && !millisecond) date = new Date()

        this.#format = format

        if (typeof date === "string") this.parse(date)

        const setDate = () => {
            if (month === 0) month = 1

            this.#year = year
            this.#month = month - 1
            this.#day = day
            this.#hour = hour
            this.#minute = minute
            this.#second = second
            this.#millisecond = millisecond
        }

        if (date instanceof DateObject) {
            this.#year = date.year
            this.#month = date.month.index
            this.#day = date.day
            this.#hour = date.hour
            this.#minute = date.minute
            this.#second = date.second
            this.#millisecond = date.millisecond
            this.#calendar = date.calendar.toUpperCase()
            this.#local = date.local.toUpperCase()
            this.#format = date._format
            this.#leaps = date.leaps
            mustGetLeaps = false
        }

        if (date instanceof Date) {
            year = date.getFullYear()
            month = date.getMonth() + 1
            day = date.getDate()
            hour = date.getHours()
            minute = date.getMinutes()
            second = date.getSeconds()
            millisecond = date.getMilliseconds()

            if (this.#calendar !== DateObject.calendars.GEORGIAN) {
                let dateObject = new DateObject({ year, month, day, hour, minute, second }).convert(this.#calendar)

                year = dateObject.year
                month = dateObject.month.number
                day = dateObject.day
                hour = dateObject.hour
                minute = dateObject.minute
                second = dateObject.second
                millisecond = dateObject.millisecond
            }

            setDate()
        }

        if (!date) setDate()

        if (mustGetLeaps) {
            this.#getLeaps()

            this.#fix()
        }
    }

    parse(string) {
        if (!string) return

        let format = this.#format

        if (this.#local !== DateObject.locals.en) {
            let digits = this.#digits[this.#local]

            for (let digit of digits) {
                string = string.replace(new RegExp(digit, "g"), digits.indexOf(digit))
            }
        }

        if (!format) {
            const regex = /(\d{2,4})?\W?([A-z]{3,9}|\d{1,2})?\W?(\d{1,2})?\W?(\d{1,2})?\W?(\d{1,2})?\W?(\d{1,2})?\W?(\d{1,3})?\W?(am|pm)?/
            let [, year, month, day, hour, minute, second, millisecond, a] = string.match(regex)

            if (month) {
                if (/\d+/.test(month)) {
                    month = Number(month) - 1
                } else {
                    month = this.months.findIndex($month => new RegExp(month, "i").test($month.name))
                }
            }

            this.#year = year ? Number(year) : 0
            this.#month = month || 0
            this.#day = Number(day || 1)
            this.#hour = Number(hour || 0)
            this.#minute = Number(minute || 0)
            this.#second = Number(second || 0)
            this.#millisecond = Number(millisecond || 0)

            if (a && a === "pm" && this.#hour < 12) {
                this.#hour = this.#hour + 12
            }
        } else {
            for (let key in this.#types) {
                const match = format.match(new RegExp(key))

                if (!match) continue

                const str = string.substring(match.index, string.length).match(this.#types[key])[0]
                this.#reverse[key](str)

                format = format.replace(key, "?".repeat(key.length))
            }

            if (!this.#hour) this.#hour = 0
            if (!this.#minute) this.#minute = 0
            if (!this.#second) this.#second = 0
            if (!this.#millisecond) this.#millisecond = 0
        }

        if (string.includes(this.#meridiems[this.#local][1].lowerCase) && this.#hour < 12) {
            this.#hour = this.#hour + 12
        }

        if (string.includes(this.#meridiems[this.#local][1].upperCase) && this.#hour < 12) {
            this.#hour = this.#hour + 12
        }
    }

    #fix = () => {
        const setMonth = () => {
            let mustGetLeaps = false

            while (this.#month < 1) {
                this.#year -= 1
                this.#month = 12 + this.#month

                mustGetLeaps = true
            }

            while (this.#month > 11) {
                this.#month -= 12
                this.#year += 1

                mustGetLeaps = true
            }

            if (mustGetLeaps) this.#getLeaps()
        }

        while (this.#millisecond >= 1000) {
            this.#millisecond -= 1000
            this.#second += 1
        }

        while (this.#millisecond < 0) {
            this.#millisecond += 1000
            this.#second -= 1
        }

        while (this.#second >= 60) {
            this.#second -= 60
            this.#minute += 1
        }

        while (this.#second < 0) {
            this.#second += 60
            this.#minute -= 1
        }

        while (this.#minute >= 60) {
            this.#minute -= 60
            this.#hour += 1
        }

        while (this.#minute < 0) {
            this.#minute += 60
            this.#hour -= 1
        }

        while (this.#hour >= 24) {
            this.#hour -= 24
            this.#day += 1
        }

        while (this.#hour < 0) {
            this.#hour += 24
            this.#day -= 1
        }

        while (true) {
            if (this.#month < 1 || this.#month > 11) setMonth()

            while (this.#day < 1) {
                this.#month -= 1

                setMonth()

                this.#day = this.month.length + this.#day
            }

            if (this.#day <= this.month.length) break

            this.#day -= this.month.length
            this.#month++
        }
    }

    #getLeaps = () => {
        let year = 1
        this.#leaps = []

        switch (this.#calendar) {
            case DateObject.calendars.PERSIAN:
                let delta = 0.242362
                let offset = 0.2684
                let correct = { 5: 4, 38: 37, 199: 198, 232: 231, 265: 264, 298: 297, 557: 558, 590: 591, 623: 624, 982: 983, 1015: 1016, 1048: 1049, 1081: 1082, 1114: 1115, 1242: 1243, 1374: 1375, 1407: 1408, 1440: 1441, 1506: 1507, 1539: 1540, 1572: 1573, 1605: 1606, 1931: 1932, 1964: 1965, 2063: 2064, 2096: 2097, 2687: 2686, 2720: 2719, 2753: 2752, 2819: 2818, 2852: 2851, 2885: 2884, 3017: 3016, 3112: 3111, 3145: 3144, 3178: 3177, 3211: 3210, 3244: 3243, 3277: 3276, 3310: 3309, 3343: 3342, 3376: 3375, 3409: 3408, 3442: 3441, 3508: 3507, 3541: 3540, 3574: 3573, 3603: 3602, 3607: 3606, 3636: 3635, 3669: 3668, 3702: 3701, 3706: 3705, 3735: 3734, 3768: 3767, 3801: 3800, 3834: 3833, 3867: 3866, 3900: 3899, 3933: 3932, 3966: 3965, 3999: 3998, 4065: 4064, 4094: 4093, 4098: 4097, 4127: 4126, 4131: 4130, 4160: 4159, 4193: 4192, 4226: 4225, 4259: 4258, 4292: 4291, 4325: 4324, 4358: 4357, 4391: 4390, 4585: 4584, 4618: 4617, 4651: 4650, 4750: 4749, 4943: 4944, 4976: 4977, 5009: 5010, 5170: 5171, 5203: 5204, 5236: 5237, 5265: 5266, 5269: 5270, 5298: 5299, 5302: 5303, 5331: 5332, 5335: 5336, 5364: 5365, 5368: 5369, 5393: 5394, 5397: 5398, 5401: 5402, 5426: 5427, 5430: 5431, 5434: 5435, 5459: 5460, 5463: 5464, 5467: 5468, 5492: 5493, 5496: 5497, 5500: 5501, 5521: 5522, 5525: 5526, 5529: 5530, 5554: 5555, 5558: 5559, 5562: 5563, 5587: 5588, 5591: 5592, 5595: 5596, 5616: 5617, 5620: 5621, 5624: 5625, 5628: 5629, 5649: 5650, 5653: 5654, 5657: 5658, 5661: 5662, 5682: 5683, 5686: 5687, 5690: 5691, 5694: 5695, 5715: 5716, 5719: 5720, 5723: 5724, 5727: 5728, 5744: 5745, 5748: 5749, 5752: 5753, 5756: 5757, 5760: 5761, 5777: 5778, 5781: 5782, 5785: 5786, 5789: 5790, 5793: 5794, 5810: 5811, 5814: 5815, 5818: 5819, 5822: 5823, 5826: 5827, 5839: 5840, 5843: 5844, 5847: 5848, 5851: 5852, 5855: 5856, 5859: 5860, 5872: 5873, 5876: 5877, 5880: 5881, 5884: 5885, 5888: 5889, 5892: 5893, 5901: 5902, 5905: 5906, 5909: 5910, 5913: 5914, 5917: 5918, 5921: 5922, 5925: 5926, 5934: 5935, 5938: 5939, 5942: 5943, 5946: 5947, 5950: 5951, 5954: 5955, 5958: 5959, 5967: 5968, 5971: 5972, 5975: 5976, 5979: 5980, 5983: 5984, 5987: 5988, 5991: 5992, 5996: 5997, 6000: 6001, 6004: 6005, 6008: 6009, 6012: 6013, 6016: 6017, 6020: 6021, 6029: 6030, 6033: 6034, 6037: 6038, 6041: 6042, 6045: 6046, 6049: 6050, 6053: 6054, 6058: 6059, 6062: 6063, 6066: 6067, 6070: 6071, 6074: 6075, 6078: 6079, 6082: 6083, 6086: 6087, 6091: 6092, 6095: 6096, 6099: 6100, 6103: 6104, 6107: 6108, 6111: 6112, 6115: 6116, 6119: 6120, 6124: 6125, 6128: 6129, 6132: 6133, 6136: 6137, 6140: 6141, 6144: 6145, 6148: 6149, 6152: 6154, 6157: 6158, 6161: 6162, 6165: 6166, 6169: 6170, 6173: 6174, 6177: 6178, 6181: 6182, 6185: 6187, 6190: 6191, 6194: 6195, 6198: 6199, 6202: 6203, 6206: 6207, 6210: 6211, 6214: 6215, 6218: 6220, 6223: 6224, 6227: 6228, 6231: 6232, 6235: 6236, 6239: 6240, 6243: 6244, 6247: 6249, 6251: 6253, 6256: 6257, 6260: 6261, 6264: 6265, 6268: 6269, 6272: 6273, 6276: 6277, 6280: 6282, 6284: 6286, 6289: 6290, 6293: 6294, 6297: 6298, 6301: 6302, 6305: 6306, 6309: 6310, 6313: 6315, 6317: 6319, 6322: 6323, 6326: 6327, 6330: 6331, 6334: 6335, 6338: 6339, 6342: 6344, 6346: 6348, 6350: 6352, 6355: 6356, 6359: 6360, 6363: 6364, 6367: 6368, 6371: 6372, 6375: 6377, 6379: 6381, 6383: 6385, 6388: 6389, 6392: 6393, 6396: 6397, 6400: 6401, 6404: 6406, 6408: 6410, 6412: 6414, 6416: 6418, 6421: 6422, 6425: 6426, 6429: 6430, 6433: 6434, 6437: 6439, 6441: 6443, 6445: 6447, 6449: 6451, 6454: 6455, 6458: 6459, 6462: 6463, 6466: 6468, 6470: 6472, 6474: 6476, 6478: 6480, 6482: 6484, 6487: 6488, 6491: 6492, 6495: 6496 }

                while (year <= this.#year) {
                    offset += delta

                    if (offset > 1) offset -= 1

                    if (offset >= 0.257800926 && offset <= 0.5) {
                        let $correct = correct[year] || year
                        if ($correct <= this.#year) this.#leaps.push($correct)
                    }

                    year++
                }

                break
            default:
                while (year <= this.#year) {
                    if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) this.#leaps.push(year)

                    year++
                }
        }

    }

    convert(calendar = DateObject.calendars.GEORGIAN) {
        calendar = DateObject.calendars[calendar.toUpperCase()]

        if (!calendar) throw new Error("calendar not found")

        const difference = () => {
            let difference = 0

            switch (this.#calendar) {
                case DateObject.calendars.PERSIAN:
                    if (calendar === DateObject.calendars.GEORGIAN) difference = 226895
                    break
                case DateObject.calendars.GEORGIAN:
                    if (calendar === DateObject.calendars.PERSIAN) difference = -226895
                    break
                default: difference = 0
            }

            return difference
        }

        const offset = () => {
            let offset = 0

            switch (this.#calendar + "->" + calendar) {
                case "PERSIAN->GEORGIAN":
                case "GEORGIAN->PERSIAN":
                    if (this.#month < 10 || (this.#month === 10 && this.#day <= (this.isLeap ? 11 : 10))) {
                        offset = calendar === DateObject.calendars.GEORGIAN ? 621 : -621
                    } else {
                        offset = calendar === DateObject.calendars.GEORGIAN ? 622 : -622
                    }
                    break
                default: offset = 0
            }

            return offset
        }

        let year = this.#year
        let days = this.dayOfBeginning
        let month = undefined
        let target = undefined
        days += difference()

        target = new DateObject({
            calendar,
            year: year + offset(),
            month: 1,
            day: 1
        })

        days -= target.isLeap ? (target.leaps.length - 1) : target.leaps.length

        year = ~~(days / 365) + 1
        days = days % 365
        month = 0

        for (let $month of target.months) {
            if (days < $month.length) break

            days -= $month.length
            month++
        }

        this.#year = year
        this.#month = month
        this.#day = ~~days
        this.#calendar = calendar
        this.#getLeaps()
        this.#fix()

        return this
    }

    format(format) {
        if (!format) format = this.#format || "YYYY/MM/DD"

        let index = 100 //can be any number
        let object = {}

        for (let key in this.#types) {
            if (format.includes(key)) {
                format = format.replace(key, index)
                object[index] = this.getProperty(key)
            }
            index++
        }

        for (let key in object) {
            format = format.replace(key, object[key])
        }

        if (this.#local !== DateObject.locals.en) {
            let digits = this.#digits[this.#local]

            format = format.replace(/[0-9]/g, function (w) { return digits[+w] })
        }

        return format
    }

    getProperty(key) {
        const pad = number => number < 10 ? "0" + number : number

        switch (key) {
            case "YYYY": return this.year
            case "YY": return this.year.toString().substring(2, 4)
            case "MMMM": return this.month.name
            case "MMM": return this.month.shortName
            case "MM": return pad(this.month.number)
            case "M": return this.month.number
            case "DDDD": return this.dayOfYear
            case "DDD": return this.dayOfYear
            case "DD": return pad(this.day)
            case "D": return this.day
            case "HH": return pad(this.hour)
            case "H": return this.hour
            case "dddd": return this.weekDay.name
            case "ddd": return this.weekDay.shortName
            case "hh": return pad(this.hour > 12 ? this.hour - 12 : this.hour)
            case "h": return this.hour > 12 ? this.hour - 12 : this.hour
            case "mm": return pad(this.minute)
            case "m": return this.minute
            case "ss": return pad(this.second)
            case "s": return this.second
            case "SSS": return this.#millisecond
            case "SS": return this.#millisecond.toString().substring(0, 2)
            case "S": return this.#millisecond.toString().substring(0, 1)
            case "a": return this.hour > 12 ? this.#meridiems[this.#local][1].lowerCase : this.#meridiems[this.#local][0].lowerCase
            case "A": return this.hour > 12 ? this.#meridiems[this.#local][1].upperCase : this.#meridiems[this.#local][0].upperCase
            default: return ""
        }
    }

    setYear(number) {
        this.year = number

        return this
    }

    setMonth(number) {
        this.month = number

        return this
    }

    setDay(number) {
        this.day = number

        return this
    }

    setHour(number) {
        this.hour = number

        return this
    }

    setMinute(number) {
        this.minute = number

        return this
    }

    setSecond(number) {
        this.second = number

        return this
    }

    setMillisecond(number) {
        this.millisecond = number

        return this
    }

    setFormat(format) {
        this.#format = format

        return this
    }

    setLocal(local) {
        this.local = local

        return this
    }

    setCalendar(calendar) {
        this.calendar = calendar

        return this
    }

    toFirstOfYear() {
        this.month = 1
        this.day = 1

        return this
    }

    toLastOfYear() {
        if (this.day >= 29) this.day = 29

        this.month = 12
        this.toLastOfMonth()
        return this
    }

    toFirstOfMonth() {
        this.#day = 1
        return this
    }

    toLastOfMonth() {
        this.#day = 0
        this.#month += 1
        this.#fix()
        return this
    }

    toFirstOfWeek() {
        this.day -= this.weekDay.index

        return this
    }

    toLastOfWeek() {
        this.day += 6 - this.weekDay.index

        return this
    }

    toFirstWeekOfYear() {
        this.toFirstOfYear()

        if (this.weekDay.index === 0) return this

        return this.toLastOfWeek().setDay(this.day + 1)
    }

    toLastWeekOfYear() {
        return this.toLastOfYear().toFirstOfWeek()
    }

    toString() {
        return this.format()
    }

    toDate() {
        if (this.#calendar !== DateObject.calendars.GEORGIAN) this.convert(DateObject.calendars.GEORGIAN)

        return new Date(this.#year, this.#month, this.#day, this.#hour, this.#second)
    }

    get dayOfBeginning() {

        let days = (this.#year - 1) * 365
        days += this.dayOfYear
        days += this.isLeap ? (this.leaps.length - 1) : this.leaps.length

        return days
    }

    get dayOfYear() {
        let days = this.#day
        let months = this.months

        for (let i = 0; i <= months.length; i++) {
            if (i >= this.#month) break

            days += months[i].length
        }
        return days
    }

    get weekOfYear() {
        return ~~(this.dayOfYear / 7) + 1
    }

    get daysLeft() {
        let days = this.isLeap ? 366 : 365

        return days - this.dayOfYear
    }

    get year() {
        return this.#year
    }

    get month() {
        let month = this.months[this.#month]

        month.index = this.#month
        month.number = month.index + 1

        month.toString = function () {
            return this.number
        }

        return month
    }

    get day() {
        return this.#day
    }

    get weekDay() {
        let index = this.dayOfBeginning % 7
        let weekDay = this.#weeks[this.#calendar][this.#local][index]

        weekDay.number = weekDay.index + 1

        weekDay.toString = function () {
            return this.number
        }

        return weekDay
    }

    get hour() {
        return this.#hour
    }

    get minute() {
        return this.#minute
    }

    get second() {
        return this.#second
    }

    get millisecond() {
        return this.#millisecond
    }

    get months() {
        let months = this.#months[this.#calendar][this.#local]

        switch (this.#calendar) {
            case DateObject.calendars.PERSIAN:
                months[11].length = this.isLeap ? 30 : 29
                break
            default:
                months[1].length = this.isLeap ? 29 : 28
        }

        return months
    }

    get weeks() {
        let weeks = this.#weeks[this.#calendar][this.#local]

        weeks.sort((a, b) => a.index - b.index)
        weeks = weeks.map(week => { return { ...week, number: week.index + 1 } })

        return weeks
    }

    get leaps() {
        return this.#leaps
    }

    get calendar() {
        return this.#calendar.toLowerCase()
    }

    get local() {
        return this.#local.toLowerCase()
    }

    get meridiems() {
        return this.#meridiems[this.#local]
    }

    get _format() {
        return this.#format
    }

    get isLeap() {
        return this.#leaps.includes(this.#year)
    }

    set year(value) {
        this.#year = value
        this.#getLeaps()
        this.#fix()
    }

    set month(value) {
        this.#month = value - 1
        this.#fix()
    }

    set day(value) {
        this.#day = value
        this.#fix()
    }

    set hour(value) {
        this.#hour = value
        this.#fix()
    }

    set minute(value) {
        this.#minute = value
        this.#fix()
    }

    set second(value) {
        this.#second = value
        this.#fix()
    }

    set millisecond(value) {
        this.#millisecond = value
        this.#fix()
    }

    set calendar(calendar) {
        this.convert(calendar)
    }

    set local(local) {
        local = local.toUpperCase()

        if (!DateObject.locals[local]) local = DateObject.locals.en

        this.#local = local
    }

    set _format(format) {
        this.#format = format
    }
}

module.exports = DateObject