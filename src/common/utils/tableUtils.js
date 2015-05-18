import React from 'react';

export function generateRow(url, tweetHeader, header, ja, en, key, className='') {
  return (
    <tr key={key} className={className}>
      <th>{ header }</th>
      <td className='white-pre'>{ infoString(ja) }</td>
      <td className='white-pre'>{ infoString(en) }</td>
      <td><a href={ generateTweetUrl({
        text: `[${tweetHeader}] ${header}: ${infoString(ja)} / ${infoString(en)}`,
        url: url,
        hashtags: ['ljtc']
      }) } target='_blank'><img src='/images/Twitter_logo_blue_16.png' /></a></td>
    </tr>
  );
}

function infoString(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<.*?>/g, '\n').replace(/\n+/g, '\n').trim();
}

function generateTweetUrl({text, url, hashtags}) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('http://ljtc.pocka.info' + url)}&hashtags=${hashtags.join(',')}`;
}
