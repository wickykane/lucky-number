import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AutoSizer from 'react-virtualized-auto-sizer';
import $ from 'jquery';
import Button from '../Button';
import { CustomerWinner } from '../../app/types';

const BOX_PADDING = 8;
const DELAY_TIME = 300;

const Container = styled.div`
  background: linear-gradient(180deg, #0849a9 0%, #032470 100%);
  border: 4px solid #ffdf00;
  border-image-slice: 30;
  border-image-source: linear-gradient(180deg, #ffdf00 0%, #ff9600 99.82%);
  border-radius: 8px;
  padding: ${BOX_PADDING}px;
`;

const OuterContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

const NumberWrapper = styled.div`
  overflow: hidden;
  border-radius: 5px;
  flex: 1;
  background: linear-gradient(161.86deg, #3379d7 4.26%, #1744ae 87.66%);
`;

const NumberList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  height: 100%;
  position: relative;
  /* transition: all 0.5s ease-in-out; */
`;

const NumberListItem = styled.li`
  width: 100%;
  height: 100%;
`;

const NumberSpin = styled.div`
  width: 100%;
  background: linear-gradient(161.86deg, #3379d7 4.26%, #1744ae 87.66%);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  color: #fff;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 70px;
`;

const ActionGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled(Button)`
  font-size: 36px;
  border-radius: 8px;
  padding: 1rem;
  min-width: 300px;
  margin-top: 2rem;
  background: linear-gradient(157.74deg, #ffcf00 5.01%, #ffab01 122.46%);
  box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.376822);
  border-radius: 8px;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  &.stop-btn {
    background: linear-gradient(157.74deg, #ff606f 5.01%, #ff943b 122.46%);
  }
  margin: auto;
`;

type Props = {
  length?: number;
  speed?: number;
  onStart: () => void;
  onEnd: () => void;
  customer?: CustomerWinner;
  status: 'start' | 'end' | 'result';
};

const DEFAULT_DATA = {
  length: 7,
  speed: 6000,
};

const ALPHABET_RANGE = [...Array(26).keys()].map(i =>
  String.fromCharCode(i + 97).toUpperCase(),
);

const NUMBER_RANGE = [...Array(10).keys()].reverse();

const ELEMENTS = [...ALPHABET_RANGE, ...NUMBER_RANGE];

const RandomNumber = (props: Props) => {
  const totalNumber = props.length || DEFAULT_DATA.length;
  const numbers = [...Array(totalNumber).keys()];
  const [baseHeight, setbaseHeight] = useState(100);
  const [DOMsofNumber, setDOMsofNumber] = useState<any>();

  const hasWinner = useRef(false);
  const isRunning = useRef(false);

  const listHeight = baseHeight * ELEMENTS.length;

  const winnerCode = useRef<string[]>([]);

  let isCompleteSpin: any = {};

  useEffect(() => {
    $(() => {
      const doms = $('.lucky-draw-number');
      setDOMsofNumber(doms);
    });
  }, []);

  useEffect(() => {
    if (props.customer) {
      hasWinner.current = true;
      winnerCode.current = (props.customer?.code || '').split('');
    }
  }, [props.customer]);

  const onCheckWinner = () => {
    const isAllDone = numbers.every((i: number) => {
      return isCompleteSpin[i];
    });
    if (isAllDone) {
      props.onEnd();
    }
  };

  const onStart = () => {
    isCompleteSpin = {};
    if (!isRunning.current) {
      isRunning.current = true;
      if (DOMsofNumber) {
        for (let i = 0; i < DOMsofNumber.length; i++) {
          (function (index: number) {
            setTimeout(() => {
              animateElement(index);
            }, index * DELAY_TIME);
          })(i);
        }
        props.onStart();
      }
    }
  };

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const animateElement = (index: number) => {
    const run = (speed: number) => {
      $(DOMsofNumber[index])
        .css('top', -listHeight)
        .animate({ top: '0px' }, speed, 'linear', function () {
          if (isRunning.current) {
            run(speed);
          } else {
            if (!hasWinner.current) {
              run(speed);
            } else {
              finish();
            }
          }
        });
    };

    const finish = () => {
      const stopIndex = ELEMENTS.findIndex(
        i => String(i) === winnerCode.current[index],
      );
      const endNum =
        stopIndex !== undefined && stopIndex !== null
          ? stopIndex
          : getRandomInt(ELEMENTS.length - 1);
      const finalPos = -(baseHeight * endNum + baseHeight);
      const finalSpeed = DEFAULT_DATA.speed - 100;

      $(DOMsofNumber[index])
        .css('top', -listHeight)
        .animate({ top: `${finalPos}px` }, finalSpeed, 'linear', function () {
          isCompleteSpin[index] = true;
          onCheckWinner();
        });
    };

    // Main Run
    run(DEFAULT_DATA.speed);
  };

  const onEnd = () => {
    isRunning.current = false;
  };

  return (
    <>
      <OuterContainer>
        <Container style={{ height: baseHeight }}>
          <AutoSizer>
            {({ width }) => {
              const originalWidth = width - BOX_PADDING;
              const baseWidth =
                (originalWidth - totalNumber * BOX_PADDING) / totalNumber;
              const baseHeight = baseWidth;
              setbaseHeight(baseHeight);

              return (
                <div
                  style={{
                    height: baseHeight,
                    width: originalWidth,
                    display: 'flex',
                    overflow: 'hidden',
                  }}
                >
                  {numbers.map(i => {
                    return (
                      <NumberWrapper
                        style={{ flex: `0 0 ${baseWidth}px`, margin: '0 4px' }}
                        key={i}
                      >
                        <NumberList
                          className={`lucky-draw-number lucky-draw-number-${i}`}
                        >
                          <NumberListItem>
                            <NumberSpin>
                              {ELEMENTS[ELEMENTS.length - 1]}
                            </NumberSpin>
                          </NumberListItem>
                          {ELEMENTS.map(i => {
                            return (
                              <NumberListItem>
                                <NumberSpin>{i}</NumberSpin>
                              </NumberListItem>
                            );
                          })}
                        </NumberList>
                      </NumberWrapper>
                    );
                  })}
                </div>
              );
            }}
          </AutoSizer>
        </Container>
      </OuterContainer>
      <ActionGroup>
        {props.status === 'start' && (
          <ActionButton onClick={onStart}>Bắt Đầu</ActionButton>
        )}
        {props.status === 'end' && (
          <ActionButton className="stop-btn" onClick={onEnd}>
            Dừng
          </ActionButton>
        )}
      </ActionGroup>
    </>
  );
};

export default RandomNumber;
