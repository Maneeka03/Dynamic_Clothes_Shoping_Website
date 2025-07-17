import React, { useState } from "react";
import { Search, Ruler } from "lucide-react";

const SizeGuide = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const sizeCharts = {
    kurta: {
      title: "Kurta Sizes",
      sizes: [
        { size: "XS", bust: "32", waist: "26", hip: "35", length: "38" },
        { size: "S", bust: "34", waist: "28", hip: "37", length: "39" },
        { size: "M", bust: "36", waist: "30", hip: "39", length: "40" },
        { size: "L", bust: "38", waist: "32", hip: "41", length: "41" },
        { size: "XL", bust: "40", waist: "34", hip: "43", length: "42" },
        { size: "XXL", bust: "42", waist: "36", hip: "45", length: "43" },
      ],
    },
    gown: {
      title: "Gown Sizes",
      sizes: [
        { size: "XS", bust: "32", waist: "26", hip: "35", length: "52" },
        { size: "S", bust: "34", waist: "28", hip: "37", length: "53" },
        { size: "M", bust: "36", waist: "30", hip: "39", length: "54" },
        { size: "L", bust: "38", waist: "32", hip: "41", length: "55" },
        { size: "XL", bust: "40", waist: "34", hip: "43", length: "56" },
        { size: "XXL", bust: "42", waist: "36", hip: "45", length: "57" },
      ],
    },
    bottom: {
      title: "Bottom Wear Sizes",
      sizes: [
        { size: "XS", waist: "26", hip: "35", length: "38", thigh: "20" },
        { size: "S", waist: "28", hip: "37", length: "39", thigh: "21" },
        { size: "M", waist: "30", hip: "39", length: "40", thigh: "22" },
        { size: "L", waist: "32", hip: "41", length: "41", thigh: "23" },
        { size: "XL", waist: "34", hip: "43", length: "42", thigh: "24" },
        { size: "XXL", waist: "36", hip: "45", length: "43", thigh: "25" }
      ]
    },
    tops: {
      title: "Tops Sizes",
      sizes: [
        { size: "XS", bust: "32", waist: "26", shoulder: "13", length: "24" },
        { size: "S", bust: "34", waist: "28", shoulder: "13.5", length: "25" },
        { size: "M", bust: "36", waist: "30", shoulder: "14", length: "26" },
        { size: "L", bust: "38", waist: "32", shoulder: "14.5", length: "27" },
        { size: "XL", bust: "40", waist: "34", shoulder: "15", length: "28" },
        { size: "XXL", bust: "42", waist: "36", shoulder: "15.5", length: "29" }
      ]
    }
  };

  const [activeTab, setActiveTab] = useState("kurta");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Size Guide</h1>
      <p className="text-gray-600 mb-6">
        Find your perfect fit with our detailed size charts. All measurements
        are in inches.
      </p>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by size..."
          className="pl-10 w-full h-10 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:to-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Measurement Guide */}
      <div className="bg-orange-100 p-4 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <Ruler className="h-6 w-6 text-primary mt-1" />
          <div>
            <h3 className="font-semibold text-primary">How to Measure</h3>
            <ul className="text-sm text-primary mt-2 space-y-1">
              <li>• Bust: Measure around the fullest part of your bust</li>
              <li>• Waist: Measure around your natural waistline</li>
              <li>• Hip: Measure around the fullest part of your hips</li>
              <li>• Length: Measure from shoulder to desired length</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6">
        {Object.keys(sizeCharts).map((category) => (
          <button
            key={category}
            className={`py-2 px-4 text-sm font-medium ${activeTab === category
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
              }`}
            onClick={() => setActiveTab(category)}
          >
            {sizeCharts[category].title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {sizeCharts[activeTab].title}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b ">
                <th className="py-3 px-4 text-left">Size</th>
                {Object.keys(sizeCharts[activeTab].sizes[0])
                  .slice(1)
                  .map((measurement) => (
                    <th
                      key={measurement}
                      className="py-3 px-4 text-left capitalize"
                    >
                      {measurement}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {sizeCharts[activeTab].sizes
                .filter((sizeData) =>
                  Object.values(sizeData).some((value) =>
                    value.toString().toLowerCase().includes(searchQuery.toLowerCase())
                  )
                )
                .map((sizeData, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold">{sizeData.size}</td>
                    {Object.entries(sizeData)
                      .slice(1)
                      .map(([key, value]) => (
                        <td key={key} className="py-3 px-4">
                          {value}"
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
