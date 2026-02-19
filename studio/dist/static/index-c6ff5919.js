import { f as dt, r as reactExports, aR as useI18nText, j as jsxRuntimeExports, av as Pane, aS as reactIsExports, q as Box, aT as usePane, a3 as useStructureTool, aw as PaneHeader$1, aU as PaneHeaderActions, at as Button, ak as BackLink, aV as ArrowLeftIcon } from "./sanity-b7f4d295.js";
const Root = dt(Box)`
  position: relative;
`;
function UserComponentPaneContent(props) {
  const { children } = props, { collapsed } = usePane();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { hidden: collapsed, height: "fill", overflow: "auto", children });
}
function UserComponentPaneHeader(props) {
  const { actionHandlers, index, menuItems, menuItemGroups, title } = props, { features } = useStructureTool();
  return !(menuItems == null ? void 0 : menuItems.length) && !title ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(
    PaneHeader$1,
    {
      actions: /* @__PURE__ */ jsxRuntimeExports.jsx(
        PaneHeaderActions,
        {
          menuItems,
          menuItemGroups,
          actionHandlers
        }
      ),
      backButton: features.backButton && index > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          as: BackLink,
          "data-as": "a",
          icon: ArrowLeftIcon,
          mode: "bleed",
          tooltipProps: { content: "Back" }
        }
      ),
      title
    }
  );
}
function UserComponentPane(props) {
  const { index, pane, paneKey, ...restProps } = props, {
    child,
    component,
    menuItems,
    menuItemGroups,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type: _unused,
    ...restPane
  } = pane, [ref, setRef] = reactExports.useState(null), { title = "" } = useI18nText(pane);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Pane, { id: paneKey, minWidth: 320, selected: restProps.isSelected, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UserComponentPaneHeader,
      {
        actionHandlers: ref == null ? void 0 : ref.actionHandlers,
        index,
        menuItems,
        menuItemGroups,
        title
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(UserComponentPaneContent, { children: [
      reactIsExports.isValidElementType(component) && reactExports.createElement(component, {
        ...restProps,
        ...restPane,
        ref: setRef,
        child,
        // @todo: Fix typings
        paneKey
      }),
      reactExports.isValidElement(component) && component
    ] })
  ] });
}
export {
  UserComponentPane as default
};
