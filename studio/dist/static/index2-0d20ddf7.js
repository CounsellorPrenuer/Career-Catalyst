import { f as dt, aR as useI18nText, j as jsxRuntimeExports, av as Pane, aW as _DEBUG, ah as usePaneLayout, aX as useGetI18nText, r as reactExports, q as Box, aY as PaneItem, ax as PaneContent, aZ as CommandList, a3 as useStructureTool, aT as usePane, aw as PaneHeader$1, aU as PaneHeaderActions, at as Button, ak as BackLink, aV as ArrowLeftIcon } from "./sanity-b7f4d295.js";
const Divider = dt.hr`
  background-color: var(--card-border-color);
  height: 1px;
  margin: 0;
  border: none;
`;
function ListPaneContent(props) {
  const { childItemId, items, isActive, layout, showIcons, title } = props, { collapsed: layoutCollapsed } = usePaneLayout(), getI18nText = useGetI18nText(
    items == null ? void 0 : items.filter(
      (item) => item.type !== "divider"
    )
  ), getItemDisabled = reactExports.useCallback(
    (itemIndex) => {
      var _a;
      return ((_a = items == null ? void 0 : items.find((_, i) => i === itemIndex)) == null ? void 0 : _a.type) === "divider";
    },
    [items]
  ), shouldShowIconForItem = reactExports.useCallback(
    (item) => {
      var _a;
      const itemShowIcon = (_a = item.displayOptions) == null ? void 0 : _a.showIcon;
      return typeof itemShowIcon < "u" ? itemShowIcon !== false : showIcons !== false;
    },
    [showIcons]
  ), renderItem = reactExports.useCallback(
    (item, ctx) => {
      const { virtualIndex: itemIndex } = ctx;
      if (item.type === "divider")
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { marginBottom: 1, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}) }, `divider-${itemIndex}`)
        );
      const pressed = !isActive && childItemId === item.id, selected = isActive && childItemId === item.id, value = item._id && item.schemaType ? { _id: item._id, _type: item.schemaType.name, title: item.title } : void 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        PaneItem,
        {
          icon: shouldShowIconForItem(item) ? item.icon : false,
          id: item.id,
          layout,
          marginBottom: 1,
          pressed,
          schemaType: item.schemaType,
          selected,
          title: getI18nText(item).title,
          value
        },
        item.id
      );
    },
    [childItemId, getI18nText, isActive, layout, shouldShowIconForItem]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PaneContent, { overflow: layoutCollapsed ? "hidden" : "auto", children: items && items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
    CommandList,
    {
      activeItemDataAttr: "data-hovered",
      ariaLabel: title,
      canReceiveFocus: true,
      getItemDisabled,
      itemHeight: 51,
      items,
      onlyShowSelectionWhenActive: true,
      paddingBottom: 1,
      paddingX: 3,
      renderItem,
      wrapAround: false
    }
  ) });
}
const ListPaneHeader = ({ index, menuItems, menuItemGroups, title }) => {
  const { features } = useStructureTool(), { collapsed, isLast } = usePane(), tabIndex = isLast && !collapsed ? -1 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PaneHeader$1,
    {
      actions: /* @__PURE__ */ jsxRuntimeExports.jsx(PaneHeaderActions, { menuItems, menuItemGroups }),
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
      tabIndex,
      title
    }
  );
};
function ListPane(props) {
  const { childItemId, index, isActive, isSelected, pane, paneKey } = props, { defaultLayout, displayOptions, items, menuItems, menuItemGroups } = pane, showIcons = (displayOptions == null ? void 0 : displayOptions.showIcons) !== false, { title } = useI18nText(pane);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Pane,
    {
      currentMaxWidth: 350,
      "data-testid": "structure-tool-list-pane",
      "data-ui": "ListPane",
      id: paneKey,
      maxWidth: 640,
      minWidth: 320,
      selected: isSelected,
      children: [
        _DEBUG,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ListPaneHeader,
          {
            index,
            menuItems,
            menuItemGroups,
            title
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ListPaneContent,
          {
            childItemId,
            isActive,
            items,
            layout: defaultLayout,
            showIcons,
            title
          },
          paneKey
        )
      ]
    }
  );
}
export {
  ListPane as default
};
