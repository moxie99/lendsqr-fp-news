/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newscatcher.p.rapidapi.com/v1/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'c7bc0687aamsh2e4a2d3412c98c7p103bc6jsnd82c441a1fc8');
      headers.set('X-RapidAPI-Host', 'newscatcher.p.rapidapi.com');
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchEnterprise: builder.query({
      query: (q) => ({
        url: 'search_enterprise',
        params: { q, lang: 'en', sort_by: 'relevancy', page: '1', media: 'True' },
      }),
    }),
  }),
});

export const { useSearchEnterpriseQuery } = newsApi;
