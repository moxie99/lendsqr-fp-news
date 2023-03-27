/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: 'newsApi',
  tagTypes:["news"],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.newscatcherapi.com/v2/',
    prepareHeaders: (headers) => {
      headers.set('x-api-key','zxbgE2jBjajX0UszCeCOnKKJytmJa8OvAARBmpn-QIA');
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


<<<<<<< HEAD
=======
// cfAjBJr1mKnj4ZrsWrAIB3Eb7g8jgW2QOBVggajUYSM

// cfAjBJr1mKnj4ZrsWrAIB3Eb7g8jgW2QOBVggajUYSM
>>>>>>> 5ee83ecd97c8c72107709f91644a13debcffbd6e
