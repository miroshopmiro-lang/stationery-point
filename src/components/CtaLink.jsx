import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { waEnquiry, WA_ENQUIRIES } from '../lib/utils';

/*
 * Link for data-driven CTAs. A target of "wa:<key>" opens WhatsApp with the matching
 * pre-filled enquiry from WA_ENQUIRIES; anything else is an in-app route. `nav` renders a
 * NavLink so the header keeps its active state (className may then be a function).
 */
export default function CtaLink({ to, nav = false, className, children, ...rest }) {
  if (typeof to === 'string' && to.startsWith('wa:')) {
    const key = to.slice(3);
    if (!WA_ENQUIRIES[key]) throw new Error(`Unknown WhatsApp enquiry "${key}"`);
    const cls = typeof className === 'function' ? className({ isActive: false }) : className;
    return (
      <a href={waEnquiry(key)} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
      </a>
    );
  }
  const Comp = nav ? NavLink : Link;
  return <Comp to={to} className={className} {...rest}>{children}</Comp>;
}
