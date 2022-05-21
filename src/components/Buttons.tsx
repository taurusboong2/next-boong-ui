import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Buttons = () => {
  const router = useRouter();

  return (
    <Wrap>
      <Button icon>
        <Link href="/">
          <Icon name="home" />
        </Link>
      </Button>
      <Button icon>
        <Link href="">
          <Icon name="long arrow alternate left" />
        </Link>
      </Button>
    </Wrap>
  );
};

export default Buttons;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 15px;
  margin: 15px 0 20px;
`;
