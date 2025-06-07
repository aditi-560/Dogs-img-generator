import { useState, useEffect } from 'react';
import { Button, Card, Typography, Spin } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import './App.css';

const { Title } = Typography;

function App() {
  const [dogImage, setDogImage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDogImage = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();
      setDogImage(data.message);
    } catch (err) {
      console.error("Error fetching dog image", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <main className='bg' >

    
    <div className="container">
      <Title className="title">🐾 Cute Pup Viewer</Title>
      <Button
        type="primary"
        shape="round"
        icon={<ReloadOutlined />}
        onClick={fetchDogImage}
        className="fetch-button"
      >
        New Pup
      </Button>

      <div className="card-wrapper">
        {loading ? (
          <Spin size="large" />
        ) : (
          <Card
            hoverable
            className="dog-card"
            cover={
              <img
                alt="A Random Dog"
                src={dogImage}
                className="dog-image"
              />
            }
          >
            <Card.Meta description="Click 'New Pup' to see another!" />
          </Card>
        )}
      </div>
    </div>
    </main>
  );
}

export default App;
