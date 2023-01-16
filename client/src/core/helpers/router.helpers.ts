export const combinePaths = (path1: string, path2: string): string => {
    if (path1 === '' || path1 === '/') {
      return '/' + path2
    } else {
      if (path1[0] === '/') return path1 + '/' + path2
      else return '/' + path1 + '/' + path2
    }
  }
  
  export const insertParamsToRoute = (route: string, paramKey: string, paramValue: string | number): string => {
    const reg = new RegExp(':' + paramKey, "g");
    return route.replace(reg, String(paramValue))
  }
  
  export const navigateTo = (url: string): void => {
    location.pathname = url
  }
  
  export const getQueryParam = <T>(param: string, def?:T ): T => {
    try {
      const res = location.search.split(`${param}=`)[1].split('&')[0]
      return res as any 
    } catch(e) {
      return def 
    }
  }