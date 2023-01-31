export default {
  logo: <span>Dom Control</span>,
  project: {
    link: "https://github.com/RiadhAdrani/dom-control-js",
  },
  useNextSeoProps() {
    return { titleTemplate: "%s | Dom Control" };
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
