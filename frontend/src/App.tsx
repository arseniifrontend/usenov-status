import { useEffect, useState } from "react";

import { ServiceCard } from "./components/ServiceCard";
import { getServicesStatus } from "./services/status.service";

import type {
  Service,
  StatusResponse,
} from "./types/status.types";

function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadStatus() {
    try {
      const data: StatusResponse =
        await getServicesStatus();

      setServices(data.services);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStatus();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main
      className="
        min-h-screen
        bg-[#050505]
        text-white
      "
    >
      <div
        className="
          mx-auto
          max-w-5xl
  
          px-4
          py-12
  
          sm:px-6
          sm:py-16
  
          lg:px-8
        "
      >
        <div className="mb-12">
          <h1
            className="
              text-4xl
              font-bold
              tracking-tight
  
              sm:text-5xl
              md:text-6xl
            "
          >
            Usenov Status
          </h1>
  
          <p
            className="
              mt-4
              text-sm
              text-zinc-500
  
              sm:text-base
            "
          >
            All systems operational
          </p>
        </div>
  
        <div
          className="
            grid
            gap-5
          "
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;