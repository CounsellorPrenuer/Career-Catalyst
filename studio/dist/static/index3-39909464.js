var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Z as operate, $ as createOperatorSubscriber, r as reactExports, a0 as useRouter, a1 as useRouterState, a2 as isRecord$4, a3 as useStructureTool, a4 as useDocumentStore, f as dt, a5 as __vitePreload, j as jsxRuntimeExports, a6 as LoadingPane, a7 as isEqual, X as isHotkey, i as useToast, a8 as useSchema, J as useTheme, a9 as _isCustomDocumentTypeDefinition, aa as PortalProvider, ab as LOADING_PANE, ac as useWorkspace, ad as setActivePanes, ae as ErrorBoundary, af as SourceProvider, ag as StructureToolProvider, ah as usePaneLayout, ai as toString, aj as ChildLink, ak as BackLink, al as ReferenceChildLink, am as ParameterizedLink, an as omit, ao as PaneRouterContext, ap as map, k as useTranslation, aq as structureLocaleNamespace, ar as SerializeError, m as Card, n as Container, H as Heading, S as Stack, T as Text, o as Code, q as Box, as as generateHelpUrl, at as Button, au as SyncIcon, av as Pane, aw as PaneHeader$1, ax as PaneContent, D as Translate, F as Flex, ay as WarningOutlineIcon, az as PaneLayout, aA as startWith, aB as scan, aC as switchMap, aD as distinctUntilChanged, aE as NEVER, aF as ReplaySubject, aG as v4, aH as firstValueFrom, aI as useEditState, aJ as useDocumentPreview, aK as isObservable, aL as from, aM as of, aN as concat, aO as nanoid, aP as publishReplay, aQ as refCount } from "./sanity-b7f4d295.js";
function pairwise() {
  return operate(function(source, subscriber) {
    var prev;
    var hasPrev = false;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var p = prev;
      prev = value;
      hasPrev && subscriber.next([p, value]);
      hasPrev = true;
    }));
  });
}
const emptyArray = [];
function PaneRouterProvider(props) {
  const { children, flatIndex, index, params, payload, siblingIndex } = props, { navigate, navigateIntent, resolvePathFromState } = useRouter(), routerState = useRouterState(), { panes, expand } = usePaneLayout(), routerPaneGroups = reactExports.useMemo(
    () => (routerState == null ? void 0 : routerState.panes) || emptyArray,
    [routerState == null ? void 0 : routerState.panes]
  ), lastPane = reactExports.useMemo(() => panes == null ? void 0 : panes[panes.length - 2], [panes]), groupIndex = index - 1, createNextRouterState = reactExports.useCallback(
    (modifier) => {
      const currentGroup = routerPaneGroups[groupIndex] || [], currentItem = currentGroup[siblingIndex], nextGroup = modifier(currentGroup, currentItem), nextPanes = [
        ...routerPaneGroups.slice(0, groupIndex),
        nextGroup,
        ...routerPaneGroups.slice(groupIndex + 1)
      ];
      return { ...routerState || {}, panes: nextPanes };
    },
    [groupIndex, routerPaneGroups, routerState, siblingIndex]
  ), modifyCurrentGroup = reactExports.useCallback(
    (modifier) => {
      const nextRouterState = createNextRouterState(modifier);
      return setTimeout(() => navigate(nextRouterState), 0), nextRouterState;
    },
    [createNextRouterState, navigate]
  ), createPathWithParams = reactExports.useCallback(
    (nextParams) => {
      const nextRouterState = createNextRouterState((siblings, item) => [
        ...siblings.slice(0, siblingIndex),
        { ...item, params: nextParams },
        ...siblings.slice(siblingIndex + 1)
      ]);
      return resolvePathFromState(nextRouterState);
    },
    [createNextRouterState, resolvePathFromState, siblingIndex]
  ), setPayload = reactExports.useCallback(
    (nextPayload) => {
      modifyCurrentGroup((siblings, item) => [
        ...siblings.slice(0, siblingIndex),
        { ...item, payload: nextPayload },
        ...siblings.slice(siblingIndex + 1)
      ]);
    },
    [modifyCurrentGroup, siblingIndex]
  ), setParams = reactExports.useCallback(
    (nextParams) => {
      modifyCurrentGroup((siblings, item) => [
        ...siblings.slice(0, siblingIndex),
        { ...item, params: nextParams },
        ...siblings.slice(siblingIndex + 1)
      ]);
    },
    [modifyCurrentGroup, siblingIndex]
  ), handleEditReference = reactExports.useCallback(
    ({ id, parentRefPath, type, template }) => {
      navigate({
        panes: [
          ...routerPaneGroups.slice(0, groupIndex + 1),
          [
            {
              id,
              params: { template: template.id, parentRefPath: toString(parentRefPath), type },
              payload: template.params
            }
          ]
        ]
      });
    },
    [groupIndex, navigate, routerPaneGroups]
  ), ctx = reactExports.useMemo(
    () => ({
      // Zero-based index (position) of pane, visually
      index: flatIndex,
      // Zero-based index of pane group (within URL structure)
      groupIndex,
      // Zero-based index of pane within sibling group
      siblingIndex,
      // Payload of the current pane
      payload,
      // Params of the current pane
      params,
      // Whether or not the pane has any siblings (within the same group)
      hasGroupSiblings: routerPaneGroups[groupIndex] ? routerPaneGroups[groupIndex].length > 1 : false,
      // The length of the current group
      groupLength: routerPaneGroups[groupIndex] ? routerPaneGroups[groupIndex].length : 0,
      // Current router state for the "panes" property
      routerPanesState: routerPaneGroups,
      // Curried StateLink that passes the correct state automatically
      ChildLink,
      // Curried StateLink that pops off the last pane group
      // Only pass if this is not the first pane
      BackLink: flatIndex ? BackLink : void 0,
      // A specialized `ChildLink` that takes in the needed props to open a
      // referenced document to the right
      ReferenceChildLink,
      // Similar to `ReferenceChildLink` expect without the wrapping component
      handleEditReference,
      // Curried StateLink that passed the correct state, but merges params/payload
      ParameterizedLink,
      // Replaces the current pane with a new one
      replaceCurrent: (opts = {}) => {
        modifyCurrentGroup(() => [
          { id: opts.id || "", payload: opts.payload, params: opts.params || {} }
        ]);
      },
      // Removes the current pane from the group
      closeCurrent: () => {
        modifyCurrentGroup(
          (siblings, item) => siblings.length > 1 ? siblings.filter((sibling) => sibling !== item) : siblings
        );
      },
      // Removes all panes to the right including current
      closeCurrentAndAfter: (expandLast = true) => {
        expandLast && lastPane && expand(lastPane.element), navigate({
          panes: [...routerPaneGroups.slice(0, groupIndex)]
        });
      },
      // Duplicate the current pane, with optional overrides for payload, parameters
      duplicateCurrent: (options) => {
        modifyCurrentGroup((siblings, item) => {
          const duplicatedItem = {
            ...item,
            payload: (options == null ? void 0 : options.payload) || item.payload,
            params: (options == null ? void 0 : options.params) || item.params
          };
          return [
            ...siblings.slice(0, siblingIndex),
            duplicatedItem,
            ...siblings.slice(siblingIndex)
          ];
        });
      },
      // Set the view for the current pane
      setView: (viewId) => {
        const restParams = omit(params, "view");
        return setParams(viewId ? { ...restParams, view: viewId } : restParams);
      },
      // Set the parameters for the current pane
      setParams,
      // Set the payload for the current pane
      setPayload,
      // A function that returns a path with the given parameters
      createPathWithParams,
      // Proxied navigation to a given intent. Consider just exposing `router` instead?
      navigateIntent
    }),
    [
      flatIndex,
      groupIndex,
      siblingIndex,
      payload,
      params,
      routerPaneGroups,
      handleEditReference,
      setParams,
      setPayload,
      createPathWithParams,
      navigateIntent,
      modifyCurrentGroup,
      lastPane,
      navigate,
      expand
    ]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PaneRouterContext.Provider, { value: ctx, children });
}
class PaneResolutionError extends Error {
  constructor({ message, context, helpId, cause }) {
    super(message);
    __publicField(this, "cause");
    __publicField(this, "context");
    __publicField(this, "helpId");
    this.name = "PaneResolutionError", this.context = context, this.helpId = helpId, this.cause = cause;
  }
}
const randomIdCache = /* @__PURE__ */ new WeakMap();
function assignId(obj) {
  const cachedValue = randomIdCache.get(obj);
  if (cachedValue)
    return cachedValue;
  const id = nanoid();
  return randomIdCache.set(obj, id), id;
}
const isPromise = (thing) => !!thing && typeof (thing == null ? void 0 : thing.then) == "function", isSerializable = (thing) => isRecord$4(thing) ? typeof thing.serialize == "function" : false, rethrowWithPaneResolutionErrors = (next) => (unresolvedPane, context, flatIndex) => {
  try {
    return next(unresolvedPane, context, flatIndex);
  } catch (e) {
    throw e instanceof PaneResolutionError ? e : new PaneResolutionError({
      message: typeof (e == null ? void 0 : e.message) == "string" ? e.message : "",
      context,
      cause: e
    });
  }
}, wrapWithPublishReplay = (next) => (...args) => next(...args).pipe(
  // need to add publishReplay + refCount to ensure new subscribers always
  // get an emission. without this, memoized observables may get stuck
  // waiting for their first emissions resulting in a loading pane
  publishReplay(1),
  refCount()
);
function createPaneResolver(middleware) {
  const resolvePane = rethrowWithPaneResolutionErrors(
    wrapWithPublishReplay(
      middleware((unresolvedPane, context, flatIndex) => {
        if (!unresolvedPane)
          throw new PaneResolutionError({
            message: "Pane returned no child",
            context,
            helpId: "structure-item-returned-no-child"
          });
        return isPromise(unresolvedPane) || isObservable(unresolvedPane) ? from(unresolvedPane).pipe(
          switchMap((result) => resolvePane(result, context, flatIndex))
        ) : isSerializable(unresolvedPane) ? resolvePane(unresolvedPane.serialize(context), context, flatIndex) : typeof unresolvedPane == "function" ? resolvePane(unresolvedPane(context.id, context), context, flatIndex) : of(unresolvedPane);
      })
    )
  );
  return resolvePane;
}
const bindCache = /* @__PURE__ */ new WeakMap();
function memoBind(obj, methodKey) {
  const boundMethods = bindCache.get(obj) || /* @__PURE__ */ new Map();
  if (boundMethods) {
    const bound2 = boundMethods.get(methodKey);
    if (bound2)
      return bound2;
  }
  const method = obj[methodKey];
  if (typeof method != "function")
    throw new Error(
      `Expected property \`${methodKey}\` to be a function but got ${typeof method} instead.`
    );
  const bound = method.bind(obj);
  return boundMethods.set(methodKey, bound), bindCache.set(obj, boundMethods), bound;
}
async function resolveIntent(options) {
  const resolvedPaneCache = /* @__PURE__ */ new Map(), resolvePane = createPaneResolver((nextFn) => (unresolvedPane, context, flatIndex) => {
    const key = unresolvedPane && `${assignId(unresolvedPane)}-${context.path.join("__")}`, cachedResolvedPane = key && resolvedPaneCache.get(key);
    if (cachedResolvedPane)
      return cachedResolvedPane;
    const result = nextFn(unresolvedPane, context, flatIndex);
    return key && resolvedPaneCache.set(key, result), result;
  }), fallbackEditorPanes = [
    [
      {
        id: `__edit__${options.params.id}`,
        params: { ...omit(options.params, ["id"]), type: options.params.type },
        payload: options.payload
      }
    ]
  ];
  async function traverse({
    currentId,
    flatIndex,
    intent,
    params,
    parent: parent2,
    path,
    payload,
    unresolvedPane,
    levelIndex,
    structureContext
  }) {
    var _a;
    if (!unresolvedPane)
      return [];
    const { id: targetId, type: schemaTypeName, ...otherParams } = params, resolvedPane = await firstValueFrom(resolvePane(unresolvedPane, {
      id: currentId,
      splitIndex: 0,
      parent: parent2,
      path,
      index: flatIndex,
      params: {},
      payload: void 0,
      structureContext
    }, flatIndex));
    return resolvedPane.type === "document" && resolvedPane.id === targetId ? [
      {
        panes: [
          ...path.slice(0, path.length - 1).map((i) => [{ id: i }]),
          [{ id: targetId, params: otherParams, payload }]
        ],
        depthIndex: path.length,
        levelIndex
      }
    ] : (
      // if the resolve pane's `canHandleIntent` returns true, then resolve
      ((_a = resolvedPane.canHandleIntent) == null ? void 0 : _a.call(resolvedPane, intent, params, {
        pane: resolvedPane,
        index: flatIndex
      })) || // if the pane's `canHandleIntent` did not return true, then match against
      // this default case. we will resolve the intent if:
      resolvedPane.type === "documentList" && // 1. the schema type matches (this required for the document to render)
      resolvedPane.schemaTypeName === schemaTypeName && // 2. the filter is the default filter.
      //
      // NOTE: this case is to prevent false positive matches where the user
      // has configured a more specific filter for a particular type. In that
      // case, the user can implement their own `canHandleIntent` function
      resolvedPane.options.filter === "_type == $type" ? [
        {
          panes: [
            // map the current path to router panes
            ...path.map((id) => [{ id }]),
            // then augment with the intents IDs and params
            [{ id: params.id, params: otherParams, payload }]
          ],
          depthIndex: path.length,
          levelIndex
        }
      ] : resolvedPane.type === "list" && resolvedPane.child && resolvedPane.items ? (await Promise.all(
        resolvedPane.items.map((item, nextLevelIndex) => item.type === "divider" ? Promise.resolve([]) : traverse({
          currentId: item._id || item.id,
          flatIndex: flatIndex + 1,
          intent,
          params,
          parent: resolvedPane,
          path: [...path, item.id],
          payload,
          unresolvedPane: typeof resolvedPane.child == "function" ? memoBind(resolvedPane, "child") : resolvedPane.child,
          levelIndex: nextLevelIndex,
          structureContext
        }))
      )).flat() : []
    );
  }
  const closestPaneToRoot = (await traverse({
    currentId: "root",
    flatIndex: 0,
    levelIndex: 0,
    intent: options.intent,
    params: options.params,
    parent: null,
    path: [],
    payload: options.payload,
    unresolvedPane: options.rootPaneNode,
    structureContext: options.structureContext
  })).sort((a, b) => a.depthIndex === b.depthIndex ? a.levelIndex - b.levelIndex : a.depthIndex - b.depthIndex)[0];
  return closestPaneToRoot ? closestPaneToRoot.panes : fallbackEditorPanes;
}
const fallbackEditorChild = (nodeId, context) => {
  const id = nodeId.replace(/^__edit__/, ""), {
    params,
    payload,
    structureContext: { resolveDocumentNode }
  } = context, { type, template } = params;
  if (!type)
    throw new Error(
      `Document type for document with ID ${id} was not provided in the router params.`
    );
  let defaultDocumentBuilder = resolveDocumentNode({ schemaType: type, documentId: id }).id("editor");
  return template && (defaultDocumentBuilder = defaultDocumentBuilder.initialValueTemplate(
    template,
    payload
  )), defaultDocumentBuilder.serialize();
};
function hashContext(context) {
  var _a, _b;
  return `contextHash(${JSON.stringify({
    id: context.id,
    parentId: parent && assignId(parent),
    path: context.path,
    index: context.index,
    splitIndex: context.splitIndex,
    serializeOptionsIndex: (_a = context.serializeOptions) == null ? void 0 : _a.index,
    serializeOptionsPath: (_b = context.serializeOptions) == null ? void 0 : _b.path
  })})`;
}
const hashResolvedPaneMeta = (meta) => {
  const normalized = {
    type: meta.type,
    id: meta.routerPaneSibling.id,
    params: meta.routerPaneSibling.params || {},
    payload: meta.routerPaneSibling.payload || null,
    flatIndex: meta.flatIndex,
    groupIndex: meta.groupIndex,
    siblingIndex: meta.siblingIndex,
    path: meta.path,
    paneNode: meta.type === "resolvedMeta" ? assignId(meta.paneNode) : null
  };
  return `metaHash(${JSON.stringify(normalized)})`;
};
function resolvePaneTree({
  unresolvedPane,
  flattenedRouterPanes,
  parent: parent2,
  path,
  resolvePane,
  structureContext
}) {
  const [current, ...rest] = flattenedRouterPanes, next = rest[0], context = {
    id: current.routerPaneSibling.id,
    splitIndex: current.siblingIndex,
    parent: parent2,
    path: [...path, current.routerPaneSibling.id],
    index: current.flatIndex,
    params: current.routerPaneSibling.params || {},
    payload: current.routerPaneSibling.payload,
    structureContext
  };
  try {
    return resolvePane(unresolvedPane, context, current.flatIndex).pipe(
      // this switch map receives a resolved pane
      switchMap((paneNode) => {
        const resolvedPaneMeta = {
          type: "resolvedMeta",
          ...current,
          paneNode,
          path: context.path
        }, loadingPanes = rest.map((i, restIndex) => ({
          type: "loading",
          path: [
            ...context.path,
            ...rest.slice(restIndex).map((_, currentIndex) => `[${i.flatIndex + currentIndex}]`)
          ],
          paneNode: null,
          ...i
        }));
        if (!rest.length)
          return of([resolvedPaneMeta]);
        let nextStream;
        return (
          /* the fallback editor case */
          (next == null ? void 0 : next.routerPaneSibling.id.startsWith("__edit__")) ? nextStream = resolvePaneTree({
            unresolvedPane: fallbackEditorChild,
            flattenedRouterPanes: rest,
            parent: parent2,
            path: context.path,
            resolvePane,
            structureContext
          }) : current.groupIndex === (next == null ? void 0 : next.groupIndex) ? nextStream = resolvePaneTree({
            unresolvedPane,
            flattenedRouterPanes: rest,
            parent: parent2,
            path,
            resolvePane,
            structureContext
          }) : nextStream = resolvePaneTree({
            unresolvedPane: typeof paneNode.child == "function" ? memoBind(paneNode, "child") : paneNode.child,
            flattenedRouterPanes: rest,
            parent: paneNode,
            path: context.path,
            resolvePane,
            structureContext
          }), concat(
            // we emit the loading panes first in a concat (this emits immediately)
            of([resolvedPaneMeta, ...loadingPanes]),
            // then whenever the next stream is done, the results will be combined.
            nextStream.pipe(map((nextResolvedPanes) => [resolvedPaneMeta, ...nextResolvedPanes]))
          )
        );
      })
    );
  } catch (e) {
    if (e instanceof PaneResolutionError && (e.context && console.warn(
      `Pane resolution error at index ${e.context.index}${e.context.splitIndex > 0 ? ` for split pane index ${e.context.splitIndex}` : ""}: ${e.message}${e.helpId ? ` - see ${generateHelpUrl(e.helpId)}` : ""}`,
      e
    ), e.helpId === "structure-item-returned-no-child"))
      return of([]);
    throw e;
  }
}
function createResolvedPaneNodeStream({
  routerPanesStream,
  rootPaneNode,
  initialCacheState = {
    cacheKeysByFlatIndex: [],
    flattenedRouterPanes: [],
    resolvedPaneCache: /* @__PURE__ */ new Map(),
    resolvePane: () => NEVER
  },
  structureContext
}) {
  return routerPanesStream.pipe(
    // add in implicit "root" router pane
    map((rawRouterPanes) => [[{ id: "root" }], ...rawRouterPanes]),
    // create flattened router panes
    map((routerPanes) => routerPanes.flatMap(
      (routerPaneGroup, groupIndex) => routerPaneGroup.map((routerPaneSibling, siblingIndex) => ({
        routerPaneSibling,
        groupIndex,
        siblingIndex
      }))
    ).map((i, index) => ({ ...i, flatIndex: index }))),
    // calculate a "diffIndex" used for clearing the memo cache
    startWith([]),
    pairwise(),
    map(([prev, curr]) => {
      for (let i = 0; i < curr.length; i++) {
        const prevValue = prev[i], currValue = curr[i];
        if (!isEqual(prevValue, currValue))
          return {
            flattenedRouterPanes: curr,
            diffIndex: i
          };
      }
      return {
        flattenedRouterPanes: curr,
        diffIndex: curr.length
      };
    }),
    // create the memoized `resolvePane` function and manage the memo cache
    scan((acc, next) => {
      const { cacheKeysByFlatIndex, resolvedPaneCache } = acc, { flattenedRouterPanes, diffIndex } = next, beforeDiffIndex = cacheKeysByFlatIndex.slice(0, diffIndex + 1), afterDiffIndex = cacheKeysByFlatIndex.slice(diffIndex + 1), keysToKeep = new Set(beforeDiffIndex.flatMap((keySet) => Array.from(keySet))), keysToDelete = afterDiffIndex.flatMap((keySet) => Array.from(keySet)).filter((key) => !keysToKeep.has(key));
      for (const key of keysToDelete)
        resolvedPaneCache.delete(key);
      return {
        flattenedRouterPanes,
        cacheKeysByFlatIndex,
        resolvedPaneCache,
        resolvePane: createPaneResolver((nextFn) => (unresolvedPane, context, flatIndex) => {
          const key = unresolvedPane && `${assignId(unresolvedPane)}-${hashContext(context)}`, cachedResolvedPane = key && resolvedPaneCache.get(key);
          if (cachedResolvedPane)
            return cachedResolvedPane;
          const result = nextFn(unresolvedPane, context, flatIndex);
          if (!key)
            return result;
          const cacheKeySet = cacheKeysByFlatIndex[flatIndex] || /* @__PURE__ */ new Set();
          return cacheKeySet.add(key), cacheKeysByFlatIndex[flatIndex] = cacheKeySet, resolvedPaneCache.set(key, result), result;
        })
      };
    }, initialCacheState),
    // run the memoized, recursive resolving
    switchMap(
      ({ flattenedRouterPanes, resolvePane }) => resolvePaneTree({
        unresolvedPane: rootPaneNode,
        flattenedRouterPanes,
        parent: null,
        path: [],
        resolvePane,
        structureContext
      })
    )
  ).pipe(
    // this diffs the previous emission with the current one. if there is a new
    // loading pane at the same position where a previous pane already had a
    // resolved value (looking at the IDs to compare), then return the previous
    // pane instead of the loading pane
    scan(
      (prev, next) => next.map((nextPane, index) => {
        const prevPane = prev[index];
        return !prevPane || nextPane.type !== "loading" ? nextPane : prevPane.routerPaneSibling.id === nextPane.routerPaneSibling.id ? prevPane : nextPane;
      }),
      []
    ),
    // this prevents duplicate emissions
    distinctUntilChanged((prev, next) => {
      if (prev.length !== next.length)
        return false;
      for (let i = 0; i < next.length; i++) {
        const prevValue = prev[i], nextValue = next[i];
        if (hashResolvedPaneMeta(prevValue) !== hashResolvedPaneMeta(nextValue))
          return false;
      }
      return true;
    })
  );
}
function useRouterPanesStream() {
  const routerStateSubject = reactExports.useMemo(() => new ReplaySubject(1), []), routerPanes$ = reactExports.useMemo(
    () => routerStateSubject.asObservable().pipe(map((_routerState) => (_routerState == null ? void 0 : _routerState.panes) || [])),
    [routerStateSubject]
  ), { state: routerState } = useRouter();
  return reactExports.useEffect(() => {
    routerStateSubject.next(routerState);
  }, [routerState, routerStateSubject]), routerPanes$;
}
function useResolvedPanes() {
  const [error, setError] = reactExports.useState();
  if (error)
    throw error;
  const { structureContext, rootPaneNode } = useStructureTool(), [data, setData] = reactExports.useState({
    paneDataItems: [],
    resolvedPanes: [],
    routerPanes: []
  }), routerPanesStream = useRouterPanesStream();
  return reactExports.useEffect(() => {
    const subscription = createResolvedPaneNodeStream({
      rootPaneNode,
      routerPanesStream,
      structureContext
    }).pipe(
      map((resolvedPanes) => {
        const routerPanes = resolvedPanes.reduce((acc, next) => {
          const currentGroup = acc[next.groupIndex] || [];
          return currentGroup[next.siblingIndex] = next.routerPaneSibling, acc[next.groupIndex] = currentGroup, acc;
        }, []), groupsLen = routerPanes.length, paneDataItems = resolvedPanes.map((pane) => {
          const { groupIndex, flatIndex, siblingIndex, routerPaneSibling, path } = pane, itemId = routerPaneSibling.id, nextGroup = routerPanes[groupIndex + 1];
          return {
            active: groupIndex === groupsLen - 2,
            childItemId: (nextGroup == null ? void 0 : nextGroup[0].id) ?? null,
            index: flatIndex,
            itemId: routerPaneSibling.id,
            groupIndex,
            key: `${pane.type === "loading" ? "unknown" : pane.paneNode.id}-${itemId}-${siblingIndex}`,
            pane: pane.type === "loading" ? LOADING_PANE : pane.paneNode,
            params: routerPaneSibling.params || {},
            path: path.join(";"),
            payload: routerPaneSibling.payload,
            selected: flatIndex === resolvedPanes.length - 1,
            siblingIndex
          };
        });
        return {
          paneDataItems,
          routerPanes,
          resolvedPanes: paneDataItems.map((pane) => pane.pane)
        };
      })
    ).subscribe({
      next: (result) => setData(result),
      error: (e) => setError(e)
    });
    return () => subscription.unsubscribe();
  }, [rootPaneNode, routerPanesStream, structureContext]), data;
}
async function ensureDocumentIdAndType(documentStore, id, type) {
  if (id && type)
    return { id, type };
  if (!id && type)
    return { id: v4(), type };
  if (id && !type) {
    const resolvedType = await firstValueFrom(
      documentStore.resolveTypeForDocument(id)
    );
    return { id, type: resolvedType };
  }
  throw new PaneResolutionError({
    message: "Neither document `id` or `type` was provided when trying to resolve intent."
  });
}
const EMPTY_RECORD = {}, IntentResolver = reactExports.memo(function() {
  const { navigate } = useRouter(), maybeIntent = useRouterState(
    reactExports.useCallback((routerState) => {
      const intentName = typeof routerState.intent == "string" ? routerState.intent : void 0;
      return intentName ? {
        intent: intentName,
        params: isRecord$4(routerState.params) ? routerState.params : EMPTY_RECORD,
        payload: routerState.payload
      } : void 0;
    }, [])
  ), { rootPaneNode, structureContext } = useStructureTool(), documentStore = useDocumentStore(), [error, setError] = reactExports.useState(null);
  if (error)
    throw error;
  return reactExports.useEffect(() => {
    if (maybeIntent) {
      const { intent, params, payload } = maybeIntent;
      let cancelled = false;
      async function effect() {
        const { id, type } = await ensureDocumentIdAndType(
          documentStore,
          typeof params.id == "string" ? params.id : void 0,
          typeof params.type == "string" ? params.type : void 0
        );
        if (cancelled)
          return;
        const panes = await resolveIntent({
          intent,
          params: { ...params, id, type },
          payload,
          rootPaneNode,
          structureContext
        });
        cancelled || navigate({ panes }, { replace: true });
      }
      return effect().catch(setError), () => {
        cancelled = true;
      };
    }
  }, [documentStore, maybeIntent, navigate, rootPaneNode, structureContext]), null;
}), PathSegment = dt.span`
  &:not(:last-child)::after {
    content: ' ➝ ';
    opacity: 0.5;
  }
`;
function formatStack(stack) {
  return stack.replace(/\(\.\.\.\)\./g, `(...)
  .`).replace(/__WEBPACK_IMPORTED_MODULE_\d+_+/g, "").replace(/___default\./g, ".").replace(new RegExp(` \\(https?:\\/\\/${window.location.host}`, "g"), " (");
}
function StructureError({ error }) {
  if (!(error instanceof PaneResolutionError))
    throw error;
  const { cause } = error, { t } = useTranslation(structureLocaleNamespace), stack = (cause == null ? void 0 : cause.stack) || error.stack, showStack = stack && !(cause instanceof SerializeError) && !error.message.includes("Module build failed:"), path = cause instanceof SerializeError ? cause.path : [], helpId = cause instanceof SerializeError && cause.helpId || error.helpId, handleReload = reactExports.useCallback(() => {
    window.location.reload();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { height: "fill", overflow: "auto", padding: 4, sizing: "border", tone: "critical", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { as: "h2", children: t("structure-error.header.text") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { marginTop: 4, padding: 4, radius: 2, overflow: "auto", shadow: 1, tone: "inherit", children: [
      path.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { space: 2, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: 1, weight: "medium", children: t("structure-error.structure-path.label") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: path.slice(1).map((segment, i) => (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ jsxRuntimeExports.jsx(PathSegment, { children: segment }, `${segment}-${i}`)
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { marginTop: 4, space: 2, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: 1, weight: "medium", children: t("structure-error.error.label") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { children: showStack ? formatStack(stack) : error.message })
      ] }),
      helpId && /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { marginTop: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: generateHelpUrl(helpId), rel: "noopener noreferrer", target: "_blank", children: t("structure-error.docs-link.text") }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { marginTop: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          text: t("structure-error.reload-button.text"),
          icon: SyncIcon,
          tone: "primary",
          onClick: handleReload
        }
      ) })
    ] })
  ] }) });
}
function UnknownPane(props) {
  const { isSelected, pane, paneKey } = props, type = isRecord$4(pane) && pane.type || null, { t } = useTranslation(structureLocaleNamespace);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Pane, { id: paneKey, selected: isSelected, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaneHeader$1, { title: t("panes.unknown-pane-type.title") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaneContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { padding: 4, children: typeof type == "string" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { as: "p", muted: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Translate,
      {
        t,
        i18nKey: "panes.unknown-pane-type.unknown-type.text",
        values: { type }
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { as: "p", muted: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Translate, { t, i18nKey: "panes.unknown-pane-type.missing-type.text" }) }) }) })
  ] });
}
const paneMap = {
  component: reactExports.lazy(() => __vitePreload(() => import("./index-c6ff5919.js"), true ? ["static/index-c6ff5919.js","static/sanity-b7f4d295.js"] : void 0)),
  document: reactExports.lazy(() => __vitePreload(() => import("./sanity-b7f4d295.js").then((n) => n.a_), true ? [] : void 0).then(function(n) {
    return n.pane;
  })),
  documentList: reactExports.lazy(() => __vitePreload(() => import("./sanity-b7f4d295.js").then((n) => n.a_), true ? [] : void 0).then(function(n) {
    return n.pane$1;
  })),
  list: reactExports.lazy(() => __vitePreload(() => import("./index2-0d20ddf7.js"), true ? ["static/index2-0d20ddf7.js","static/sanity-b7f4d295.js"] : void 0))
}, StructureToolPane = reactExports.memo(
  function(props) {
    const {
      active,
      childItemId,
      groupIndex,
      index,
      itemId,
      pane,
      paneKey,
      params,
      payload,
      path,
      selected,
      siblingIndex
    } = props, PaneComponent = paneMap[pane.type] || UnknownPane;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PaneRouterProvider,
      {
        flatIndex: index,
        index: groupIndex,
        params,
        payload,
        siblingIndex,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingPane, { paneKey, path, selected }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PaneComponent,
          {
            childItemId: childItemId || "",
            index,
            itemId,
            isActive: active,
            isSelected: selected,
            paneKey,
            pane
          }
        ) })
      }
    );
  },
  ({ params: prevParams = {}, payload: prevPayload = null, ...prev }, { params: nextParams = {}, payload: nextPayload = null, ...next }) => {
    if (!isEqual(prevParams, nextParams) || !isEqual(prevPayload, nextPayload))
      return false;
    const keys = /* @__PURE__ */ new Set([...Object.keys(prev), ...Object.keys(next)]);
    for (const key of keys)
      if (prev[key] !== next[key])
        return false;
    return true;
  }
);
function NoDocumentTypesScreen() {
  const { t } = useTranslation(structureLocaleNamespace);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { height: "fill", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flex, { align: "center", height: "fill", justify: "center", padding: 4, sizing: "border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { width: 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { padding: 4, radius: 2, shadow: 1, tone: "caution", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: 1, children: /* @__PURE__ */ jsxRuntimeExports.jsx(WarningOutlineIcon, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { flex: 1, marginLeft: 3, space: 3, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { as: "h1", size: 1, weight: "medium", children: t("no-document-types-screen.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { as: "p", muted: true, size: 1, children: t("no-document-types-screen.subtitle") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { as: "p", muted: true, size: 1, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "https://www.sanity.io/docs/create-a-schema-and-configure-sanity-studio",
          target: "_blank",
          rel: "noreferrer",
          children: t("no-document-types-screen.link-text")
        }
      ) })
    ] })
  ] }) }) }) }) });
}
const DocumentTitle = (props) => {
  const { documentId, documentType } = props, editState = useEditState(documentId, documentType), schema = useSchema(), { t } = useTranslation(structureLocaleNamespace), isNewDocument = !(editState == null ? void 0 : editState.published) && !(editState == null ? void 0 : editState.draft), documentValue = (editState == null ? void 0 : editState.draft) || (editState == null ? void 0 : editState.published), schemaType = schema.get(documentType), { value, isLoading: previewValueIsLoading } = useDocumentPreview({
    enabled: true,
    schemaType,
    value: documentValue
  }), documentTitle = isNewDocument ? t("browser-document-title.new-document", {
    schemaType: (schemaType == null ? void 0 : schemaType.title) || (schemaType == null ? void 0 : schemaType.name)
  }) : (value == null ? void 0 : value.title) || t("browser-document-title.untitled-document"), settled = editState.ready && !previewValueIsLoading, newTitle = useConstructDocumentTitle(documentTitle);
  return reactExports.useEffect(() => {
    settled && (document.title = newTitle);
  }, [documentTitle, settled, newTitle]), null;
}, PassthroughTitle = (props) => {
  const { title } = props, newTitle = useConstructDocumentTitle(title);
  return reactExports.useEffect(() => {
    document.title = newTitle;
  }, [newTitle, title]), null;
}, StructureTitle = (props) => {
  const { resolvedPanes } = props;
  if (!(resolvedPanes == null ? void 0 : resolvedPanes.length))
    return null;
  const lastPane = resolvedPanes[resolvedPanes.length - 1];
  return isLoadingPane(lastPane) ? /* @__PURE__ */ jsxRuntimeExports.jsx(PassthroughTitle, {}) : isDocumentPane(lastPane) ? (lastPane == null ? void 0 : lastPane.title) ? /* @__PURE__ */ jsxRuntimeExports.jsx(PassthroughTitle, { title: lastPane.title }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentTitle, { documentId: lastPane.options.id, documentType: lastPane.options.type }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PassthroughTitle, { title: lastPane == null ? void 0 : lastPane.title });
};
function useConstructDocumentTitle(activeTitle) {
  const structureToolBaseTitle = useStructureTool().structureContext.title;
  return [activeTitle, structureToolBaseTitle].filter((title) => title).join(" | ");
}
function isDocumentPane(pane) {
  return pane !== LOADING_PANE && pane.type === "document";
}
function isLoadingPane(pane) {
  return pane === LOADING_PANE;
}
const StyledPaneLayout = dt(PaneLayout)`
  min-height: 100%;
  min-width: 320px;
`, isSaveHotkey = isHotkey("mod+s"), StructureTool = reactExports.memo(function({ onPaneChange }) {
  var _a;
  const { push: pushToast } = useToast(), schema = useSchema(), { layoutCollapsed, setLayoutCollapsed } = useStructureTool(), { paneDataItems, resolvedPanes } = useResolvedPanes(), isResolvingIntent = useRouterState(
    reactExports.useCallback((routerState) => typeof routerState.intent == "string", [])
  ), {
    sanity: { media }
  } = useTheme(), [portalElement, setPortalElement] = reactExports.useState(null), handleRootCollapse = reactExports.useCallback(() => setLayoutCollapsed(true), [setLayoutCollapsed]), handleRootExpand = reactExports.useCallback(() => setLayoutCollapsed(false), [setLayoutCollapsed]);
  return reactExports.useEffect(() => {
    resolvedPanes.length && onPaneChange(resolvedPanes);
  }, [onPaneChange, resolvedPanes]), reactExports.useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      isSaveHotkey(event) && (event.preventDefault(), pushToast({
        closable: true,
        id: "auto-save-message",
        status: "info",
        title: "Your work is automatically saved!",
        duration: 4e3
      }));
    };
    return window.addEventListener("keydown", handleGlobalKeyDown), () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [pushToast]), ((_a = schema._original) == null ? void 0 : _a.types.some(_isCustomDocumentTypeDefinition)) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(PortalProvider, { element: portalElement || null, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      StyledPaneLayout,
      {
        flex: 1,
        height: layoutCollapsed ? void 0 : "fill",
        minWidth: media[1],
        onCollapse: handleRootCollapse,
        onExpand: handleRootExpand,
        children: [
          paneDataItems.map(
            ({
              active,
              childItemId,
              groupIndex,
              itemId,
              key: paneKey,
              pane,
              index: paneIndex,
              params: paneParams,
              path,
              payload,
              siblingIndex,
              selected
            }) => /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: pane === LOADING_PANE ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingPane, { paneKey, path, selected }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              StructureToolPane,
              {
                active,
                groupIndex,
                index: paneIndex,
                pane,
                childItemId,
                itemId,
                paneKey,
                params: paneParams,
                payload,
                path,
                selected,
                siblingIndex
              }
            ) }, `${pane === LOADING_PANE ? "loading" : pane.type}-${paneIndex}`)
          ),
          paneDataItems.length <= 1 && isResolvingIntent && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingPane, { paneKey: "intent-resolver" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StructureTitle, { resolvedPanes }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-portal": "", ref: setPortalElement })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(NoDocumentTypesScreen, {});
});
function StructureToolBoundary({ tool: { options } }) {
  const { unstable_sources: sources } = useWorkspace(), [firstSource] = sources, { source, defaultDocumentNode, structure } = options || {};
  reactExports.useEffect(() => (setActivePanes([]), () => setActivePanes([])), []);
  const [{ error }, setError] = reactExports.useState({ error: null });
  return error ? /* @__PURE__ */ jsxRuntimeExports.jsx(StructureError, { error }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { onCatch: setError, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SourceProvider, { name: source || firstSource.name, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(StructureToolProvider, { defaultDocumentNode, structure, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StructureTool, { onPaneChange: setActivePanes }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IntentResolver, {})
  ] }) }) });
}
export {
  StructureToolBoundary as default
};
