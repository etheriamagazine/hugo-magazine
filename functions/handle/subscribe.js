export const onRequest = (context) => {

    return new Response(new Date().toISOString());
}