export const environment = {
  production: false,
  //  This API BASE URL can be set for local development, or to create a build targetted against a
  //  specific API endpoint. The Dockerfile will override this with the value of the
  //  APP_API_BASE_URL property when running in a container, if a value is present
  API_BASE_URL: '{#Api-BaseUrl#}',
  envName: '{#Env-Name#}',
};
