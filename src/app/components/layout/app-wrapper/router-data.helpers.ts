import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { filter, map } from 'rxjs';

type RouteDataPriority = 'parent' | 'child';

export function routeData<T>(
  route: ActivatedRoute,
  prioritize?: RouteDataPriority,
) {
  return route.url.pipe(
    filter(() => !!route.snapshot),
    map(() => reduceRouteData<T>(route.snapshot, prioritize)),
  );
}

const reduceRouteData = <T>(
  route: ActivatedRoute | ActivatedRouteSnapshot,
  prioritize: RouteDataPriority = 'child',
) => {
  const childrenData: T = route.firstChild
    ? reduceRouteData<T>(route.firstChild, prioritize)
    : ({} as T);

  if (prioritize === 'child') {
    return { ...route.data, ...childrenData } as T;
  } else {
    return { ...childrenData, ...route.data } as T;
  }
};
