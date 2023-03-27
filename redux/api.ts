/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: 'newsApi',
  tagTypes:["news"],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.newscatcherapi.com/v2/',
    prepareHeaders: (headers) => {
      headers.set('x-api-key','cfAjBJr1mKnj4ZrsWrAIB3Eb7g8jgW2QOBVggajUYSM');
      return headers;
    },
  }),
  endpoints: (build) => ({
    searchEnterprise: build.query({
      query: ({q, lang, sort_by, page, media}) => ({
        url: 'search',
        method: "GET",
        params: { q,  lang,  sort_by, page, media},
      }),
      providesTags: ["news"],
    }),
  }),
});

export const { useSearchEnterpriseQuery } = newsApi;


