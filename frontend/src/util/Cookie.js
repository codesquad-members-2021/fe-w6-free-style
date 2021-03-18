const Cookie = {
  set: (key, value) => {
    document.cookie = `${key}=${value}`;
  },
  get: (key) => {
    // 향후 정규표현식으로 변경 예정
    let cookies = document.cookie.split("; ");
    if (!cookies) {
      cookies = [document.cookie];
    }
    console.log(cookies, key)
    const matched = cookies.find((cookie) => {
      return cookie.startsWith(key);
    });
    return matched?.split("=").slice(-1).join();
  },
  delete: (key) => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }

}

export default Cookie;