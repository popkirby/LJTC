
export default async function performRouteHandlerStaticMethod(routes, methodName, ...args) {
  return Promise.all(routes.map(route => route.handler[methodName])
                           .filter(method => typeof method === 'function')
                           .map(method => method(...args))
                    );
}

