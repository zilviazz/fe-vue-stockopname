const dashboard = {
    path: '/masterdata',
    name: 'MasterData',
    children:[
        {
            path: "dashboard",
            name: "Default",
            component: () => import('@/views/Masterdata/Default.vue'),
            meta: { auth: true },
        },
        {
            path: "tablespart",
            name: "Part Table",
            component: () => import('@/views/Masterdata/TablesPart.vue'),
            meta: { auth: true },
        },
        {
            path: "tablesrack",
            name: "Rack Table",
            component: () => import('@/views/Masterdata/TablesRack.vue'),
            meta: { auth: true },
        },
        {
            path: "todo",
            name: "ToDo",
            component: () => import('@/views/Masterdata/ToDo.vue'),
            meta: { auth: true },
        },
        {
            path: "tablessupplier",
            name: "Supplier Table",
            component: () => import('@/views/Masterdata/TablesSupplier.vue'),
            meta: { auth: true },
        },
        {
            path: "form",
            name: "Form",
            component: () => import('@/views/Masterdata/Form.vue'),
            meta: { auth: true },
        }
    ],
};

export default dashboard;