export default {
  docsRepositoryBase: "https://github.com/RiadhAdrani/dom-control-js/tree/master",
  logo: <span>Dom Utils</span>,
  project: {
    link: "https://github.com/RiadhAdrani/dom-control-js",
  },
  useNextSeoProps() {
    return { titleTemplate: "%s | Dom Utils" };
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{" "}
        <a href="https://github.com/RiadhAdrani" target="_blank">
          RiadhAdrani
        </a>
        .
      </span>
    ),
  },
};
