import ReactGA from 'react-ga4';

export const initGA = (trackingId: string) => {
  ReactGA.initialize(trackingId);
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({ category, action, label });
};
