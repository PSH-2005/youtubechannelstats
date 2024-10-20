import { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { Pie, Line, Bar, Doughnut } from 'react-chartjs-2';
import './Dashboard.css';
const errorImageURL = "https://i.ytimg.com/vi/2x8ZvSXH0yU/maxresdefault.jpg"; 



Chart.register(...registerables);

const statesOfIndia = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
const countries = ["India", "USA", "Pakistan", "Saudi Arabia", "UAE", "UK", "Canada", "Australia", "Germany", "France", "Italy", "Spain", "Russia", "Brazil", "Japan", "China"];

const categories = ["All", "Entertainment", "Education", "Tech", "Comedy", "News", "Gaming", "Sports"];

const generateRandomPercentages = (count) => {
  const percentages = Array(count).fill(0).map(() => Math.random() * 100);
  const total = percentages.reduce((a, b) => a + b, 0);
  return percentages.map(p => (p / total) * 100);
};

const generateSubscriberData = (days) => Array(days).fill(0).map(() => Math.floor(Math.random() * 500) + 100);

const generateVideoViews = () => Array(5).fill(0).map(() => Math.floor(Math.random() * 100000) + 1000); 

const generateDailyViews = (days) => Array(days).fill(0).map(() => Math.floor(Math.random() * 1000) + 500);

const generateLikesDislikes = () => ({
  likes: Array(5).fill(0).map(() => Math.floor(Math.random() * 10000) + 1000), 
  dislikes: Array(5).fill(0).map(() => Math.floor(Math.random() * 1000) + 100)
});

const Dashboard = () => {
  const [channelData, setChannelData] = useState(null);
  const [error, setError] = useState(null);
  const [demographicType, setDemographicType] = useState('age');
  const [demographicData, setDemographicData] = useState([]);
  const [subscriberDays, setSubscriberDays] = useState(10);
  const [subscriberData, setSubscriberData] = useState(generateSubscriberData(10));
  const [category, setCategory] = useState('All');
  const [videoViews, setVideoViews] = useState(generateVideoViews());
  const [likesDislikes, setLikesDislikes] = useState(generateLikesDislikes());
  const [dailyViews, setDailyViews] = useState(generateDailyViews(10))

  const channelId = new URLSearchParams(window.location.search).get('channelId');

  useEffect(() => {
    const fetchChannelData = async () => {
      const apiKey = "AIzaSyCyEzaMunEYx-RVmX5nnoG0wCti2ITDQww";
      try {
        const channelResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`
        );
        if (channelResponse.data.items.length === 0) {
          throw new Error("Channel not found");
        }
        setChannelData(channelResponse.data.items[0]);
        setDemographicData(generateRandomPercentages(4));
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };
    fetchChannelData();
  }, [channelId]);

  const handleDemographicChange = (type) => {
    setDemographicType(type);
    if (type === 'age') {
      setDemographicData(generateRandomPercentages(4));
    } else if (type === 'country') {
      setDemographicData(generateRandomPercentages(countries.length));
    } else if (type === 'state') {
      setDemographicData(generateRandomPercentages(statesOfIndia.length));
    }
  };

  const handleSubscriberDaysChange = (days) => {
    setSubscriberDays(days);
    setSubscriberData(generateSubscriberData(days));
    setDailyViews(generateDailyViews(days)); 
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setVideoViews(generateVideoViews()); 
    setLikesDislikes(generateLikesDislikes());
  };

  // const errorImageURL = "https://i.ytimg.com/vi/2x8ZvSXH0yU/maxresdefault.jpg"; // YouTube Crying Image

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <img src={errorImageURL} alt="YouTube Crying" className="w-80 h-80 mb-4 mx-auto" />
        <p className="text-red-600 text-5xl font-extrabold distorted-text">INVALID ID</p>
      </div>
    );
  }
  
  
  
  

  if (!channelData) {
    return <div className="text-center text-white">Loading...</div>;
  }

  const demographicLabels = demographicType === 'age'
    ? ['18-24', '25-34', '35-44', '45-54']
    : demographicType === 'country'
      ? countries
      : statesOfIndia;

  const demographicChartData = {
    labels: demographicLabels,
    datasets: [{
      data: demographicData,
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#FF5733',
        '#4BC0C0', '#9966FF', '#FF9F40', '#FF4500',
        '#8A2BE2', '#00CED1', '#D2691E', '#9ACD32',
        '#2F4F4F', '#800000', '#FFA07A', '#8B0000'
      ],
    }],
  };

  const subscriberChartData = {
    labels: Array.from({ length: subscriberDays }, (_, i) => `Day ${i + 1}`),
    datasets: [{
      label: 'Subscribers',
      data: subscriberData,
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      pointRadius: 5,
      pointHoverRadius: 10,
      hoverBackgroundColor: 'rgba(75,192,192,0.6)',
      hoverBorderColor: 'rgba(75,192,192,1)',
    },
    {
      label: 'Views',
      data: dailyViews,
      fill: true,
      backgroundColor: 'rgba(153,102,255,0.4)',
      borderColor: 'rgba(153,102,255,1)',
      pointRadius: 5,
      pointHoverRadius: 10,
      hoverBackgroundColor: 'rgba(153,102,255,0.6)',
      hoverBorderColor: 'rgba(153,102,255,1)',
    }],
  };

  const videoChartData = {
    labels: ['Video 1', 'Video 2', 'Video 3', 'Video 4', 'Video 5'],
    datasets: [{
      label: 'Views',
      data: videoViews,
      backgroundColor: [
        'rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)', 'rgba(255,206,86,0.6)', 'rgba(75,192,192,0.6)', 'rgba(153,102,255,0.6)'
      ],
      borderColor: [
        'rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)', 'rgba(75,192,192,1)', 'rgba(153,102,255,1)'
      ],
      borderWidth: 1,
      hoverBackgroundColor: [
        'rgba(255,99,132,0.8)', 'rgba(54,162,235,0.8)', 'rgba(255,206,86,0.8)', 'rgba(75,192,192,0.8)', 'rgba(153,102,255,0.8)'
      ],
      hoverBorderColor: [
        'rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)', 'rgba(75,192,192,1)', 'rgba(153,102,255,1)'
      ],
    }]
  };

  const likesDislikesChartData = {
    labels: ['Video 1', 'Video 2', 'Video 3', 'Video 4', 'Video 5'],
    datasets: [
      {
        label: 'Likes',
        data: likesDislikes.likes,
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.8)',
        hoverBorderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Dislikes',
        data: likesDislikes.dislikes,
        backgroundColor: 'rgba(255,99,132,0.6)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.8)',
        hoverBorderColor: 'rgba(255,99,132,1)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        footerColor: '#fff'
      },
      legend: {
        display: true,
        labels: {
          color: '#fff'
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255,255,255,0.1)'
        },
        ticks: {
          color: '#fff'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255,255,255,0.1)'
        },
        ticks: {
          color: '#fff'
        }
      }
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white relative">
      <div className="particles">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 5}s`
          }} />
        ))}
      </div>
      <h1 className="text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500 shadow-lg glow-text">
  {channelData.snippet.title}
</h1>

{}
<div className="flex items-start space-x-8 bg-gray-800 p-6 rounded-lg shadow-lg  text-white">
  <a href={`https://www.youtube.com/channel/${channelId}`} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 logo-glow">
    <img
      src={channelData.snippet.thumbnails.high.url}
      alt={`${channelData.snippet.title} Logo`}
      className="w-40 h-40 rounded-full shadow-xl border-4 border-black"
    />
  </a>
  <div className="flex-1">
    <p className="mb-4 text-lg text-white">{channelData.snippet.description}</p>
    <div className="space-y-2 text-lg">
      <p><strong>Total Views:</strong> {Number(channelData.statistics.viewCount).toLocaleString()}</p>
      <p><strong>Total Subscribers:</strong> {Number(channelData.statistics.subscriberCount).toLocaleString()}</p>
      <p><strong>Total Videos:</strong> {channelData.statistics.videoCount}</p>
    </div>
  </div>
</div>

      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-glow">Top Videos</h2>
        <div className="flex justify-end mb-4">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="bg-gray-700 text-white p-2 rounded-md select-glow"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="chart-container">
          <Bar data={videoChartData} options={chartOptions} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-glow">Likes and Dislikes</h2>
        <div className="chart-container">
          <Doughnut data={likesDislikesChartData} options={chartOptions} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-glow">Demographics</h2>
        <div className="flex justify-end mb-4">
          <select
            value={demographicType}
            onChange={(e) => handleDemographicChange(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-md select-glow"
          >
            <option value="age">Age Demographics</option>
            <option value="country">Country Demographics</option>
            <option value="state">State Demographics</option>
          </select>
        </div>
        <div className="chart-container">
          <Pie data={demographicChartData} options={chartOptions} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-glow">Subscriber Growth and Views</h2>
        <div className="flex justify-end mb-4">
          <select
            value={subscriberDays}
            onChange={(e) => handleSubscriberDaysChange(Number(e.target.value))}
            className="bg-gray-700 text-white p-2 rounded-md select-glow"
          >
            <option value={10}>Last 10 Days</option>
            <option value={20}>Last 20 Days</option>
            <option value={30}>Last 30 Days</option>
          </select>
        </div>
        <div className="chart-container">
          <Line data={subscriberChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
