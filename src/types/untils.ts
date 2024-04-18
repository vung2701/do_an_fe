export function concatLinkImage(image: string | undefined) {
  const image_url = `${import.meta.env.VITE_MEDIA_URL}/media/${image}` || '';
  return image_url;
}
export function concatLinkImageNoMedia(image: string | undefined) {
  const image_url = `${import.meta.env.VITE_MEDIA_URL}${image}` || '';
  return image_url;
}

export function getFirstParagraph(htmlString: string) {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  const paragraphs = doc.querySelectorAll('p');
  if (paragraphs.length > 0) {
    return paragraphs[0].innerHTML;
  }
  return '';
}

export function getShortName(longName : string){
  if (longName.length <= 20) {
        return longName;
    } else {
        return longName.substring(0, 20);
    }
}

export function convertToSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export function sortByDate(array: any[], key: string) {
  return array.sort((a, b) => {
    const dateA = new Date(a[key]);
    const dateB = new Date(b[key]);
    return dateB.getTime() - dateA.getTime();
  });
}

export function convertDate(expire_date: Date | string | undefined) {
  if (expire_date) {
    const date = new Date(expire_date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const resultDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    return resultDate;
  } else {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentDateFormatted = `${
      currentDay < 10 ? '0' + currentDay : currentDay
    }-${
      currentMonth < 10 ? '0' + currentMonth : currentMonth
    }-${currentYear}`;
    return currentDateFormatted;
  }
}

export function convertDateReverse(expire_date: Date | string | undefined) {
  if (expire_date) {
    const date = new Date(expire_date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const resultDate = `${year}-${month < 10 ? '0' + month : month}-${day}`;
    return resultDate;
  } else {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentDateFormatted = `${currentYear}-${
      currentMonth < 10 ? '0' + currentMonth : currentMonth
    }-${currentDay}`;
    return currentDateFormatted;
  }
}

export function getObjFromLocal(name: string){
  const json = localStorage.getItem(`${name}`)
  if(json){
    return JSON.parse(json)
  } else {
    return null;
  }
}

