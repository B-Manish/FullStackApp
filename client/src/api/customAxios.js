/*
 * Copyright 2022 Agnostiq Inc.
 * Note: This file is subject to a proprietary license agreement entered into between
 * you (or the person or organization that you represent) and Agnostiq Inc. Your rights to
 * access and use this file is subject to the terms and conditions of such agreement.
 * Please ensure you carefully review such agreements and, if you have any questions
 * please reach out to Agnostiq at: [support@agnostiq.com].
 */

import axios from "axios";

const CUSTOMAXIOS = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

CUSTOMAXIOS.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "AUTH_ACCESS_TOKEN"
  )}`;
  return config;
});

CUSTOMAXIOS.interceptors.response.use(
  // unwrap response data
  ({ data }) => data,

  // catch statusCode != 200 responses and format error
  (error) => {
    if (error.response) {
      const errorData = {
        ...error.response.data,
        status: error.response.status,
      };
      return Promise.reject(errorData);
    }
    return Promise.reject(new Error(error.message));
  }
);

export default CUSTOMAXIOS;
