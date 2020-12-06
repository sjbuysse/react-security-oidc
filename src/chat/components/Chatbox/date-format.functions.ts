// ISOTimeString = 2017-05-05T00:25:11.378Z
const isoDateToLocalDate = (ISOTimeString: string): Date => {
    const newTime = new Date(ISOTimeString);
    return new Date(newTime.getTime());
}

// localIsoDate: 2017-05-04T18:25:11.378Z Date object
const formatTime = (localIsoDate: Date): string => {
    function formatWith2Digits(numberToBeFormatted: number): string {
        return (numberToBeFormatted < 10 ? '0' : '') + numberToBeFormatted
    }

    const hh = localIsoDate.getHours();
    const mm = localIsoDate.getMinutes();
    return formatWith2Digits(hh) + ':' + formatWith2Digits(mm);
}

export const formatISOTimeStringToHHMM = (ISOTimeString: string) => formatTime(isoDateToLocalDate(ISOTimeString))
