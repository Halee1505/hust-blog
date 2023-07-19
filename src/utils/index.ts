import React from "react";

interface ILocation {
  lat: number;
  lng: number;
}

export function debounce<T extends Function>(cb: T, wait = 300) {
  let h: any = 0;
  let callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };
  return <T>(<any>callable);
}

export function round(value: number, precision: number) {
  if (value < 0.1) return 0.1;

  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export const formatCurrency = (value: number): string => {
  const threshold: number = 1000;
  const thousand: number = 1000;
  const million: number = 1000000;
  const billion: number = 1000000000;
  if (!value) return "0";
  if (isNaN(value)) return value.toString();
  if (value >= billion) {
    return `${round(value / billion, 1).toLocaleString()}tỷ`;
  } else if (value >= million) {
    return `${round(value / million, 1).toLocaleString()}tr`;
  } else if (value >= threshold) {
    return `${round(value / thousand, 1).toLocaleString()}k`;
  } else {
    return String(value);
  }
};

type ValidateResult = {
  result: boolean;
  message: string | null;
};

export const validatePhoneNumber = (phone: string): ValidateResult => {
  const validPhone = new RegExp("^(0|84|\\+84)?[0-9]{9}$");
  if (!validPhone.test(phone)) {
    return {
      result: false,
      message: "Số điện thoại không hợp lệ",
    };
  }

  return {
    result: true,
    message: null,
  };
};

export const validateOtp = (otp: string): ValidateResult => {
  const otpReg = new RegExp("[0-9]{6}");
  if (!otp || otp === "") {
    return {
      result: false,
      message: "Vui lòng nhập mã OTP",
    };
  } else if (!otpReg.test(otp)) {
    return {
      result: false,
      message: "Mã OTP không hợp lệ",
    };
  }
  return {
    result: true,
    message: null,
  };
};

export const formatPhoneNumber = (phone: string) => {
  return "+84" + phone.substring(1);
};

export const formatDate = (date: string) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
};

export const haversineDistance = (mk1: ILocation, mk2: ILocation) => {
  let R = 6371.0710; // Radius of the Earth in miles
  let rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
  let rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
  let difflat = rlat2 - rlat1; // Radian difference (latitudes)
  let difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  let d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
  let rounded = Math.ceil(d * 10) / 10;
  return rounded;
}