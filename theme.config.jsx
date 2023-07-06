import icon from './public/favicon.ico';

export default {
  docsRepositoryBase: 'https://github.com/RiadhAdrani/dom-control-js/tree/master',
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
      <img src={icon.src} height={30} width={30} />
      <span>Dom Utils</span>
    </div>
  ),
  head: (
    <>
      <link rel="icon" href={icon.src} />
    </>
  ),
  project: {
    link: 'https://github.com/RiadhAdrani/dom-control-js',
  },
  useNextSeoProps() {
    return { titleTemplate: '%s | Dom Utils' };
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://github.com/RiadhAdrani" target="_blank">
          RiadhAdrani
        </a>
        .
      </span>
    ),
  },
};
