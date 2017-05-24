import React from 'react';
import PropTypes from 'prop-types';
import s from './decimal-input.styl'

const DOT = 190;
const BACKSPACE = 8;

class DecimalInput extends React.Component
{
  constructor(props)
  {
    super(props);

    this.hasDecimalPoint = false;
    this.hasMaxCharacters = false;
    this.lastCharacterIsSepartor = false;
    this.decimalCount = 0;
    this.firstCharater = true;
    this.unformattedValue = '';

    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.focusHandler = this.focusHandler.bind(this);

    this.state = {content: ''};
  }

  keyDownHandler(e)
  {
    if (e.keyCode === BACKSPACE)
    {
      if (this.lastCharacterIsSepartor)
      {
        this.hasDecimalPoint = false;
        this.lastCharacterIsSepartor = false;
      }

      if (this.hasDecimalPoint && !this.lastCharacterIsSepartor)
      {
        this.decimalCount--;
        if (this.decimalCount === 0)
        {
          this.lastCharacterIsSepartor = true;
        }
      }
    }
    else if (e.keyCode === DOT)
    {
      if (this.hasDecimalPoint || this.firstCharater)
      {
        e.preventDefault();
      }
      else
      {
        this.lastCharacterIsSepartor = true;
        this.hasDecimalPoint = true;
      }
    }
    else if (isNumberCode(e.keyCode))
    {
      this.lastCharacterIsSepartor = false;
      if (this.hasDecimalPoint)
      {
        if (this.decimalCount === this.props.numberOfDecimals)
        {
          e.preventDefault();
        }
        else
        {
          this.decimalCount++;
        }
      }
      this.firstCharater = false;
    }
    else
    {
      e.preventDefault();
    }
  }

  keyUpHandler(e)
  {
    let formattedValue;
    let unformattedValue = e.target.textContent.replace(this.props.prefix, '');
    const prefix = unformattedValue && unformattedValue.length ? this.props.prefix : '';
    const index = unformattedValue.indexOf('.');

    if (index > -1 && index !== unformattedValue.length - 1)
    {
      formattedValue = unformattedValue.substring(0, index + 1) + '<small>' + unformattedValue.substring(
          index + 1) + '</small>';

      e.target.innerHTML = prefix + formattedValue;
      setSmallCaretPosition(e.target);
    }
    else
    {
      formattedValue = unformattedValue;
      e.target.textContent = prefix + formattedValue;
      if (formattedValue.length)
      {
        setBigCaretPosition(e.target, formattedValue.length + 1);
      }
    }
  }

  onChangeHandler(e)
  {
    const value = e.target.textContent.indexOf(this.props.prefix) > -1 ? e.target.textContent.substring(
      1) : e.target.textContent;

    const numberValue = value.length ? Number(value) : NaN;

    this.props.onDecimalValueChange(numberValue);
  }

  blurHandler()
  {
    this.hasFocus = false;
    this.props.blur();
  }

  focusHandler()
  {
    this.hasFocus = true;
    this.props.focus();
  }

  componentWillReceiveProps(props)
  {
    if (this.hasFocus)
    {
      return;
    }

    let formattedValue;
    let unformattedValue = isNaN(props.value) ?  '' : String(props.value);
    const prefix = unformattedValue && unformattedValue.length ? this.props.prefix : '';
    const index = unformattedValue.indexOf('.');

    if (index > -1 && index !== unformattedValue.length - 1)
    {
      this.hasDecimalPoint = true;
      this.decimalCount = unformattedValue.length - index;
      this.firstCharater = false;

      formattedValue = unformattedValue.substring(0, index + 1) + '<small>' + unformattedValue.substring(
          index + 1) + '</small>';

    }
    else
    {
      this.hasDecimalPoint = index !== - 1;
      this.decimalCount = 0;
      this.firstCharater = unformattedValue.length === 0;
      formattedValue = unformattedValue;
    }

    this.setState({content: prefix + formattedValue});
  }

  render()
  {
    return <div contentEditable
                type="number"
                pattern="[0-9.]*"
                className={s['ui-input-text-borderless']}
                dangerouslySetInnerHTML={{__html: this.state.content}}
                onKeyDown={this.keyDownHandler}
                onKeyUp={this.keyUpHandler}
                onInput={this.onChangeHandler}
                onFocus={this.focusHandler}
                onBlur={this.blurHandler}>
    </div>
  }
}

function isNumberCode(code)
{
  return (code >= 48 && code <= 57) || (code >= 96 && code <= 105)
}

function setSmallCaretPosition(element)
{
  const range = document.createRange();
  const sel = window.getSelection();

  range.setStart(element.childNodes[1], 1);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}

function setBigCaretPosition(element, position)
{
  const range = document.createRange();
  const sel = window.getSelection();

  range.setStart(element.childNodes[0], position);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}


DecimalInput.PropTypes = {
  decimalSeparator: PropTypes.string,
  numberOfDecimals: PropTypes.number
};

export default DecimalInput;