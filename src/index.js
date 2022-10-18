import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(sex, DEBOUNCE_DELAY));

function sex(event) {
  const country = event.target.value.trim();

  if (country === '') {
    countryListEl.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(country)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info('Слишкм много вариантов для такого запроса...');
        return;
      }
      if (data.length === 1) {
        countryListEl.innerHTML = '';
        renderCountry(data[0]);
        return;
      }
      countryInfo.innerHTML = '';
      renderCountriesList(data);
    })
    .catch(error => {
      countryListEl.innerHTML = '';
      countryInfo.innerHTML = '';
      Notiflix.Notify.failure('Нет такой страны, голова');
    });
}

function renderCountriesList(countries) {
  const murkup = countries
    .map(country => {
      return `<li class="country-element">
        <img
          class="country-flag"
          src="${country.flags.svg}"
          alt="${country.name.official}"
        />
        <p class="country-name">${country.name.official}</p>
      </li>`;
    })
    .join('');

  countryListEl.innerHTML = murkup;
}

function renderCountry(country) {
  console.log(country.languages);
  const murkup = `<div class="country-head">
        <img
          class="country-head-flag"
          src="${country.flags.svg}"
          alt="${country.name.official}"
        />
        <p class="country-title">${country.name.official}</p>
      </div>
      <p class="country-info-title">Capital: <span class="country-info">${
        country.capital[0]
      }</span></p>
      <p class="country-info-title">
        Population: <span class="country-info">${country.population}</span>
      </p>
      <p class="country-info-title">
        Languages: <span class="country-info">${Object.values(
          country.languages
        )}</span>
      </p>`;

  countryInfo.innerHTML = murkup;
}
