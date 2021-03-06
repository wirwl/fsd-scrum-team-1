import { TFunction } from 'next-i18next';
import type { INavigationListProps } from 'src/components/Footer/components/NavigationList/NavigationList';

type FooterConf = {
  navBlocks: INavigationListProps[];
  subscription: Record<string, string>;
  copyright: string;
  description: string;
};

const getFooterConf = (t: TFunction): FooterConf => ({
  navBlocks: [
    {
      title: t('nav.navigation'),
      links: [
        {
          name: t('nav.aboutUs'),
          href: '/404',
        },
        {
          name: t('nav.news'),
          href: '/404',
        },
        {
          name: t('nav.supports'),
          href: '/404',
        },
        {
          name: t('nav.services'),
          href: '/404',
        },
      ],
    },
    {
      title: t('nav.aboutUs'),
      links: [
        {
          name: t('nav.aboutService'),
          href: '/404',
        },
        {
          name: t('nav.ourTeem'),
          href: '/404',
        },
        {
          name: t('nav.jobs'),
          href: '/404',
        },
        {
          name: t('nav.investors'),
          href: '/404',
        },
      ],
    },
    {
      title: t('nav.supports'),
      links: [
        {
          name: t('nav.agreements'),
          href: '/404',
        },
        {
          name: t('nav.communities'),
          href: '/404',
        },
        {
          name: t('nav.communicationWithUs'),
          href: '/404',
        },
      ],
    },
  ],

  subscription: {
    title: t('nav.subscription'),
    description: t('footer:subscriptionMessage'),
    url: '/subscription-api',
  },

  copyright: t('footer:allRight'),

  description: t('footer:description'),
});

export default getFooterConf;
