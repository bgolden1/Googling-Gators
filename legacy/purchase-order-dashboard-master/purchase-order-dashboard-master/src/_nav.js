export default {
  items: [
    {
      name: 'My POs',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Create PO',
      url: '/create',
      icon: 'icon-pencil',
    },
    {
      title: true,
      name: 'Admin',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Admin Dashboard',
      url: '/admin',
      icon: 'icon-drop',
    },
  ],
};
