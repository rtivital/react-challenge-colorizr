import React from 'react';
import { Logo } from 'components';
import { Container, Icon, glyphs } from 'ui';
import './footer.scss';

const Footer = () => (
  <footer className="footer">
    <Container className="footer__inner">
      <div className="footer__title">
        <Logo light className="footer__logo" /> is a part of React Challenge
      </div>

      <p className="footer__description">
        Build with <Icon className="footer__heart" glyph={glyphs.heart} />
        by <a href="https://github.com/rtivital" className="footer__link" target="_blank" rel="noopener noreferrer">Vitaly Rtishchev</a>
      </p>
    </Container>
  </footer>
);

export default Footer;
